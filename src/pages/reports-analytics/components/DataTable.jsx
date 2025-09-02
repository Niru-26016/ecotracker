import React, { useState, useMemo } from 'react';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';
import Input from '../../../components/ui/Input';

const DataTable = ({ data, columns, title, exportable = true }) => {
  const [sortConfig, setSortConfig] = useState({ key: null, direction: 'asc' });
  const [searchTerm, setSearchTerm] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage, setItemsPerPage] = useState(10);

  const sortedAndFilteredData = useMemo(() => {
    let filteredData = data;

    // Apply search filter
    if (searchTerm) {
      filteredData = data?.filter(item =>
        Object.values(item)?.some(value =>
          value?.toString()?.toLowerCase()?.includes(searchTerm?.toLowerCase())
        )
      );
    }

    // Apply sorting
    if (sortConfig?.key) {
      filteredData = [...filteredData]?.sort((a, b) => {
        const aValue = a?.[sortConfig?.key];
        const bValue = b?.[sortConfig?.key];

        if (aValue < bValue) {
          return sortConfig?.direction === 'asc' ? -1 : 1;
        }
        if (aValue > bValue) {
          return sortConfig?.direction === 'asc' ? 1 : -1;
        }
        return 0;
      });
    }

    return filteredData;
  }, [data, searchTerm, sortConfig]);

  const paginatedData = useMemo(() => {
    const startIndex = (currentPage - 1) * itemsPerPage;
    return sortedAndFilteredData?.slice(startIndex, startIndex + itemsPerPage);
  }, [sortedAndFilteredData, currentPage, itemsPerPage]);

  const totalPages = Math.ceil(sortedAndFilteredData?.length / itemsPerPage);

  const handleSort = (key) => {
    setSortConfig(prevConfig => ({
      key,
      direction: prevConfig?.key === key && prevConfig?.direction === 'asc' ? 'desc' : 'asc'
    }));
  };

  const getSortIcon = (columnKey) => {
    if (sortConfig?.key !== columnKey) return 'ArrowUpDown';
    return sortConfig?.direction === 'asc' ? 'ArrowUp' : 'ArrowDown';
  };

  const handleExport = () => {
    const csvContent = [
      columns?.map(col => col?.header)?.join(','),
      ...sortedAndFilteredData?.map(row =>
        columns?.map(col => {
          const value = col?.accessor ? col?.accessor(row) : row?.[col?.key];
          return `"${value}"`;
        })?.join(',')
      )
    ]?.join('\n');

    const blob = new Blob([csvContent], { type: 'text/csv' });
    const url = window.URL?.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `${title?.replace(/\s+/g, '_')?.toLowerCase()}_${new Date()?.toISOString()?.split('T')?.[0]}.csv`;
    a?.click();
    window.URL?.revokeObjectURL(url);
  };

  return (
    <div className="bg-card rounded-lg shadow-environmental border border-border">
      {/* Header */}
      <div className="p-6 border-b border-border">
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between space-y-4 sm:space-y-0">
          <h3 className="text-lg font-semibold text-foreground">{title}</h3>
          
          <div className="flex flex-col sm:flex-row space-y-2 sm:space-y-0 sm:space-x-4">
            {/* Search */}
            <div className="relative">
              <Input
                type="search"
                placeholder="Search data..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e?.target?.value)}
                className="pl-10 w-full sm:w-64"
              />
              <Icon 
                name="Search" 
                size={16} 
                className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground" 
              />
            </div>

            {/* Export Button */}
            {exportable && (
              <Button
                variant="outline"
                size="sm"
                iconName="Download"
                onClick={handleExport}
              >
                Export CSV
              </Button>
            )}
          </div>
        </div>
      </div>
      {/* Table */}
      <div className="overflow-x-auto">
        <table className="w-full">
          <thead className="bg-muted">
            <tr>
              {columns?.map((column) => (
                <th
                  key={column?.key}
                  className={`px-6 py-3 text-left text-xs font-medium text-muted-foreground uppercase tracking-wider ${
                    column?.sortable !== false ? 'cursor-pointer hover:bg-muted/80' : ''
                  }`}
                  onClick={() => column?.sortable !== false && handleSort(column?.key)}
                >
                  <div className="flex items-center space-x-1">
                    <span>{column?.header}</span>
                    {column?.sortable !== false && (
                      <Icon name={getSortIcon(column?.key)} size={14} />
                    )}
                  </div>
                </th>
              ))}
            </tr>
          </thead>
          <tbody className="divide-y divide-border">
            {paginatedData?.map((row, index) => (
              <tr key={index} className="hover:bg-muted/50 transition-environmental">
                {columns?.map((column) => (
                  <td key={column?.key} className="px-6 py-4 whitespace-nowrap text-sm text-foreground">
                    {column?.accessor ? column?.accessor(row) : row?.[column?.key]}
                  </td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      {/* Pagination */}
      {totalPages > 1 && (
        <div className="px-6 py-4 border-t border-border">
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between space-y-4 sm:space-y-0">
            <div className="flex items-center space-x-2">
              <span className="text-sm text-muted-foreground">Show</span>
              <select
                value={itemsPerPage}
                onChange={(e) => {
                  setItemsPerPage(Number(e?.target?.value));
                  setCurrentPage(1);
                }}
                className="border border-border rounded-md px-2 py-1 text-sm bg-background"
              >
                <option value={5}>5</option>
                <option value={10}>10</option>
                <option value={25}>25</option>
                <option value={50}>50</option>
              </select>
              <span className="text-sm text-muted-foreground">
                of {sortedAndFilteredData?.length} entries
              </span>
            </div>

            <div className="flex items-center space-x-2">
              <Button
                variant="outline"
                size="sm"
                iconName="ChevronLeft"
                disabled={currentPage === 1}
                onClick={() => setCurrentPage(prev => Math.max(prev - 1, 1))}
              >
                Previous
              </Button>
              
              <div className="flex space-x-1">
                {Array.from({ length: Math.min(5, totalPages) }, (_, i) => {
                  const pageNum = i + 1;
                  return (
                    <button
                      key={pageNum}
                      onClick={() => setCurrentPage(pageNum)}
                      className={`px-3 py-1 text-sm rounded-md transition-environmental ${
                        currentPage === pageNum
                          ? 'bg-primary text-primary-foreground'
                          : 'text-muted-foreground hover:text-foreground hover:bg-muted'
                      }`}
                    >
                      {pageNum}
                    </button>
                  );
                })}
              </div>

              <Button
                variant="outline"
                size="sm"
                iconName="ChevronRight"
                disabled={currentPage === totalPages}
                onClick={() => setCurrentPage(prev => Math.min(prev + 1, totalPages))}
              >
                Next
              </Button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default DataTable;