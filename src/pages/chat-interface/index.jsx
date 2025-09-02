import React, { useState, useEffect, useRef } from 'react';
import Header from '../../components/ui/Header';
import MessageBubble from './components/MessageBubble';
import MessageInput from './components/MessageInput';
import ConversationSidebar from './components/ConversationSidebar';
import ChatHeader from './components/ChatHeader';
import TypingIndicator from './components/TypingIndicator';
import EmptyState from './components/EmptyState';
import n8nService from '../../services/n8nService';

const ChatInterface = () => {
  const [messages, setMessages] = useState([]);
  const [conversations, setConversations] = useState([]);
  const [activeConversationId, setActiveConversationId] = useState(null);
  const [isTyping, setIsTyping] = useState(false);
  const [workflowStatus, setWorkflowStatus] = useState('idle');
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [isOnline, setIsOnline] = useState(true);
  const [n8nConnectionStatus, setN8nConnectionStatus] = useState('checking');
  const messagesEndRef = useRef(null);
  const chatContainerRef = useRef(null);

  // Mock conversations data
  const mockConversations = [
    {
      id: 'conv-1',
      title: 'Daily Carbon Tracking',
      lastMessage: 'Your carbon footprint for today is 12.5 kg CO2',
      lastActivity: new Date(Date.now() - 1000 * 60 * 30), // 30 minutes ago
      messageCount: 15,
      unreadCount: 0
    },
    {
      id: 'conv-2',
      title: 'Transportation Analysis',
      lastMessage: 'Based on your commute data, here are some recommendations...',
      lastActivity: new Date(Date.now() - 1000 * 60 * 60 * 2), // 2 hours ago
      messageCount: 8,
      unreadCount: 2
    },
    {
      id: 'conv-3',
      title: 'Energy Usage Report',
      lastMessage: 'Your home energy consumption has decreased by 15% this month',
      lastActivity: new Date(Date.now() - 1000 * 60 * 60 * 24), // 1 day ago
      messageCount: 23,
      unreadCount: 0
    },
    {
      id: 'conv-4',
      title: 'Monthly Insights',
      lastMessage: 'Here\'s your comprehensive carbon footprint analysis for September',
      lastActivity: new Date(Date.now() - 1000 * 60 * 60 * 24 * 3), // 3 days ago
      messageCount: 12,
      unreadCount: 1
    }
  ];

  // Mock messages for active conversation
  const mockMessages = [
    {
      id: 'msg-1',
      content: 'Hello! I\'m your EcoTracker assistant. I can help you track your carbon footprint, analyze your environmental impact, and provide personalized recommendations. What would you like to know?',
      type: 'text',
      isUser: false,
      timestamp: new Date(Date.now() - 1000 * 60 * 60),
      status: 'delivered'
    },
    {
      id: 'msg-2',
      content: 'I want to calculate my carbon footprint for today',
      type: 'text',
      isUser: true,
      timestamp: new Date(Date.now() - 1000 * 60 * 50),
      status: 'delivered'
    },
    {
      id: 'msg-3',
      content: 'I\'ll help you calculate your daily carbon footprint. Based on your recent activities, here\'s the breakdown:',
      type: 'data',
      isUser: false,
      timestamp: new Date(Date.now() - 1000 * 60 * 45),
      status: 'delivered',
      data: {
        'Transportation': '8.2 kg CO2',
        'Energy Usage': '3.1 kg CO2',
        'Food & Diet': '1.2 kg CO2',
        'Total': '12.5 kg CO2'
      }
    },
    {
      id: 'msg-4',
      content: 'That seems high for transportation. Can you help me reduce it?',
      type: 'text',
      isUser: true,
      timestamp: new Date(Date.now() - 1000 * 60 * 40),
      status: 'delivered'
    },
    {
      id: 'msg-5',
      content: 'Absolutely! Here are some personalized recommendations to reduce your transportation emissions:',
      type: 'action',
      isUser: false,
      timestamp: new Date(Date.now() - 1000 * 60 * 35),
      status: 'delivered',
      actions: [
        {
          label: 'Use Public Transport',
          icon: 'Bus',
          onClick: () => console.log('Public transport clicked')
        },
        {
          label: 'Carpool Options',
          icon: 'Users',
          onClick: () => console.log('Carpool clicked')
        },
        {
          label: 'Bike Routes',
          icon: 'Bike',
          onClick: () => console.log('Bike routes clicked')
        }
      ]
    }
  ];

  useEffect(() => {
    setConversations(mockConversations);
    if (mockConversations?.length > 0) {
      setActiveConversationId(mockConversations?.[0]?.id);
      setMessages(mockMessages);
    }

    // Check n8n connection on component mount
    checkN8nConnection();
  }, []);

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  useEffect(() => {
    // Update workflow status based on n8n connection and processing state
    const interval = setInterval(() => {
      if (n8nConnectionStatus === 'connected' && !isTyping) {
        setWorkflowStatus('active');
      } else if (n8nConnectionStatus === 'disconnected') {
        setWorkflowStatus('idle');
      } else if (isTyping) {
        setWorkflowStatus('processing');
      }
    }, 1000);

    return () => clearInterval(interval);
  }, [n8nConnectionStatus, isTyping]);

  const checkN8nConnection = async () => {
    try {
      const isConnected = await n8nService?.checkConnection();
      setN8nConnectionStatus(isConnected ? 'connected' : 'disconnected');
    } catch (error) {
      setN8nConnectionStatus('disconnected');
    }
  };

  const scrollToBottom = () => {
    messagesEndRef?.current?.scrollIntoView({ behavior: 'smooth' });
  };

  const handleSendMessage = async (content) => {
    const newMessage = {
      id: `msg-${Date.now()}`,
      content,
      type: 'text',
      isUser: true,
      timestamp: new Date(),
      status: 'sending'
    };

    setMessages(prev => [...prev, newMessage]);
    setIsTyping(true);

    // Update message status to sent
    setTimeout(() => {
      setMessages(prev => 
        prev?.map(msg => 
          msg?.id === newMessage?.id 
            ? { ...msg, status: 'sent' }
            : msg
        )
      );
    }, 500);

    try {
      // Check if message might be about carbon footprint analysis
      const carbonKeywords = ['carbon', 'footprint', 'emission', 'co2', 'transport', 'energy', 'food', 'travel', 'drive', 'fly', 'electricity'];
      const isEmissionQuery = carbonKeywords?.some(keyword => 
        content?.toLowerCase()?.includes(keyword)
      );

      let botResponse;

      if (isEmissionQuery && n8nConnectionStatus === 'connected') {
        try {
          // Use n8n service for emission analysis
          const emissionData = await n8nService?.analyzeEmissions(content);
          botResponse = n8nService?.formatForChat(emissionData);
          
          // Mark user message as delivered
          setMessages(prev => 
            prev?.map(msg => 
              msg?.id === newMessage?.id 
                ? { ...msg, status: 'delivered' }
                : msg
            )
          );

        } catch (error) {
          console.error('n8n Analysis Error:', error);
          botResponse = {
            type: 'error',
            content: `n8n workflow temporarily unavailable. ${error?.message}`,
            error: true
          };
        }
      } else {
        // Fallback to existing mock responses
        const responses = [
          {
            content: `I understand you want to know about "${content}". Let me provide you with relevant insights.`,
            type: 'text'
          },
          {
            content: 'Based on your query, here are the current metrics:',
            type: 'data',
            data: {
              'Current Status': 'Analyzing',
              'Data Points': '1,247',
              'Accuracy': '94.2%',
              'Last Update': 'Just now'
            }
          }
        ];

        botResponse = responses?.[Math.floor(Math.random() * responses?.length)];
        
        // Mark user message as delivered
        setMessages(prev => 
          prev?.map(msg => 
            msg?.id === newMessage?.id 
              ? { ...msg, status: 'delivered' }
            : msg
          )
        );
      }

      // Add bot response
      setTimeout(() => {
        setIsTyping(false);
        
        const botMessage = {
          id: `msg-${Date.now()}-bot`,
          ...botResponse,
          isUser: false,
          timestamp: new Date(),
          status: 'delivered'
        };

        setMessages(prev => [...prev, botMessage]);

        // If tips are available, show them as a follow-up message
        if (botResponse?.actions?.length > 0) {
          setTimeout(() => {
            const tipsMessage = {
              id: `msg-${Date.now()}-tips`,
              content: 'Quick actions you can take:',
              type: 'action',
              isUser: false,
              timestamp: new Date(),
              status: 'delivered',
              actions: botResponse?.actions
            };
            setMessages(prev => [...prev, tipsMessage]);
          }, 1000);
        }

      }, 1500);

    } catch (error) {
      setIsTyping(false);
      console.error('Message handling error:', error);
      
      const errorMessage = {
        id: `msg-${Date.now()}-error`,
        content: 'Sorry, I encountered an error processing your message. Please try again.',
        type: 'error',
        isUser: false,
        timestamp: new Date(),
        status: 'delivered'
      };

      setMessages(prev => [...prev, errorMessage]);
    }
  };

  const handleRetryMessage = (messageId) => {
    setMessages(prev => 
      prev?.map(msg => 
        msg?.id === messageId 
          ? { ...msg, type: 'text', content: 'Retrying...', status: 'sending' }
          : msg
      )
    );

    setTimeout(() => {
      setMessages(prev => 
        prev?.map(msg => 
          msg?.id === messageId 
            ? { ...msg, content: 'Message sent successfully!', status: 'delivered' }
            : msg
        )
      );
    }, 1500);
  };

  const handleSelectConversation = (conversationId) => {
    setActiveConversationId(conversationId);
    setIsSidebarOpen(false);
    
    // Load messages for selected conversation
    if (conversationId === 'conv-1') {
      setMessages(mockMessages);
    } else {
      // Load different mock messages for other conversations
      setMessages([
        {
          id: `msg-${conversationId}-1`,
          content: `This is the conversation for ${conversations?.find(c => c?.id === conversationId)?.title}`,
          type: 'text',
          isUser: false,
          timestamp: new Date(Date.now() - 1000 * 60 * 30),
          status: 'delivered'
        }
      ]);
    }
  };

  const handleNewConversation = () => {
    const newConv = {
      id: `conv-${Date.now()}`,
      title: 'New Conversation',
      lastMessage: '',
      lastActivity: new Date(),
      messageCount: 0,
      unreadCount: 0
    };
    
    setConversations(prev => [newConv, ...prev]);
    setActiveConversationId(newConv?.id);
    setMessages([]);
    setIsSidebarOpen(false);
  };

  const handleExportChat = () => {
    const chatData = {
      conversation: conversations?.find(c => c?.id === activeConversationId),
      messages: messages,
      exportDate: new Date()?.toISOString()
    };
    
    const blob = new Blob([JSON.stringify(chatData, null, 2)], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `chat-export-${activeConversationId}.json`;
    a?.click();
    URL.revokeObjectURL(url);
  };

  const handleClearChat = () => {
    setMessages([]);
  };

  const handleStartConversation = (message) => {
    if (!activeConversationId) {
      handleNewConversation();
    }
    setTimeout(() => {
      handleSendMessage(message);
    }, 100);
  };

  const activeConversation = conversations?.find(c => c?.id === activeConversationId);

  return (
    <div className="min-h-screen bg-background">
      <Header />
      <div className="pt-16 h-screen flex">
        {/* Sidebar */}
        <ConversationSidebar
          conversations={conversations}
          activeConversationId={activeConversationId}
          onSelectConversation={handleSelectConversation}
          onNewConversation={handleNewConversation}
          workflowStatus={workflowStatus}
          isOpen={isSidebarOpen}
          onClose={() => setIsSidebarOpen(false)}
        />

        {/* Main Chat Area */}
        <div className="flex-1 flex flex-col">
          {/* Chat Header */}
          <ChatHeader
            conversationTitle={activeConversation?.title || 'EcoTracker Chat with n8n'}
            participantCount={1}
            workflowStatus={workflowStatus}
            onToggleSidebar={() => setIsSidebarOpen(true)}
            onExportChat={handleExportChat}
            onClearChat={handleClearChat}
            isOnline={isOnline && n8nConnectionStatus === 'connected'}
          />

          {/* n8n Connection Status */}
          {n8nConnectionStatus !== 'connected' && (
            <div className="px-4 py-2 bg-warning/10 border-b border-warning/20">
              <div className="flex items-center space-x-2">
                <div className="w-2 h-2 bg-warning rounded-full animate-pulse"></div>
                <span className="text-sm text-warning">
                  n8n workflow {n8nConnectionStatus === 'checking' ? 'connecting...' : 'disconnected'} - Using fallback responses
                </span>
              </div>
            </div>
          )}

          {/* Messages Area */}
          <div 
            ref={chatContainerRef}
            className="flex-1 overflow-y-auto p-4 space-y-4"
          >
            {messages?.length === 0 ? (
              <EmptyState onStartConversation={handleStartConversation} />
            ) : (
              <>
                {messages?.map((message) => (
                  <MessageBubble
                    key={message?.id}
                    message={message}
                    isUser={message?.isUser}
                    timestamp={message?.timestamp}
                    onRetry={handleRetryMessage}
                  />
                ))}
                
                <TypingIndicator isVisible={isTyping} />
                <div ref={messagesEndRef} />
              </>
            )}
          </div>

          {/* Message Input */}
          <MessageInput
            onSendMessage={handleSendMessage}
            isTyping={isTyping}
            disabled={!isOnline}
            placeholder={n8nConnectionStatus === 'connected' ? 
              "Ask about your carbon footprint..." : "Type your message..."
            }
          />
        </div>
      </div>
    </div>
  );
};

export default ChatInterface;