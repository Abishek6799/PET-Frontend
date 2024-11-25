import { useEffect, useState } from "react";
import api from "../Services/api";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const MessagesList = ({ petId, userId }) => {
  const [messages, setMessages] = useState([]);
  const [messageContent, setMessageContent] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [showAllMessages, setShowAllMessages] = useState(false);
  const [isMessageBoxOpen, setIsMessageBoxOpen] = useState(false);
  const shelterId = localStorage.getItem("shelterId"); 

  const fetchMessages = async () => {
    if (!petId) {
      setError("Pet ID is missing");
      return;
    }
    try {
      const response = await api.get(`/message/pet/${petId}`);
      setMessages(response.data.messages);
      setError(null);
    } catch (error) {
      setError("No messages found");
    }
  };

  useEffect(() => {
    if (isMessageBoxOpen) {
      fetchMessages();
    }
  }, [isMessageBoxOpen, petId]);

  const handleSendMessage = async () => {
    setLoading(true);

    if (!petId || !userId) {
      toast.error("Pet ID or User ID is missing");
      setLoading(false);
      return;
    }

    if (!messageContent.trim()) {
      toast.error("Message cannot be empty");
      setLoading(false);
      return;
    }

    try {
      const messageResponse = await api.post(`/message/create/${petId}`, {
        petId,
        content: messageContent,
        receiverId: userId,
        receiverType: "User",
        senderId:shelterId,
        senderType:"Shelter",
      });

      if (messageResponse.status === 200) {
        setMessages((prevMessages) => [
          ...prevMessages,
          {
            sender: { name: "You" },
            content: messageContent,
            timestamp: new Date(),
          },
        ]);
        setMessageContent("");
      } else {
        throw new Error("Failed to send message");
      }
    } catch (error) {
      toast.error("Failed to send message. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  const handleToggleAllMessages = () => {
    setShowAllMessages((prevState) => !prevState);
  };

  const displayedMessages = showAllMessages ? messages : messages.slice(-3);

  return (
    <div>
     
      <button
        onClick={() => setIsMessageBoxOpen((prev) => !prev)}
        className="px-4 py-1 rounded-lg bg-blue-500 text-white hover:bg-blue-600"
      >
        {isMessageBoxOpen ? "Close Messages" : "Message"}
      </button>

    
      {isMessageBoxOpen && (
        <div className="flex flex-col bg-gradient-to-br from-white to-gray-100 rounded-lg shadow-lg p-6 mx-10 space-y-4 mt-4">
          <h3 className="text-2xl font-bold text-gray-800">Chat</h3>
          {error && <p className="text-red-500">{error}</p>}
          {messages.length === 0 && !error && (
            <p className="text-gray-600 text-center">No messages yet. Start the conversation!</p>
          )}

         
          <div className="flex flex-col-reverse space-y-4 space-y-reverse overflow-y-auto max-h-80 px-4 py-2 border rounded-md bg-white shadow-sm">
            {displayedMessages.map((message, index) => (
              <div
                key={index}
                className={`flex ${
                  message.sender?.name === "You" ? "justify-end" : "justify-start"
                }`}
              >
                <div
                  className={`max-w-[80%] p-3 rounded-lg shadow-md ${
                    message.sender?.name === "You"
                      ? "bg-blue-500 text-white"
                      : "bg-gray-200 text-gray-800"
                  }`}
                >
                  <p className="text-sm font-semibold">
                    {message.sender?.name === "You" ? "You" : message.sender?.name || "Shelter"}
                  </p>
                  <p>{message.content}</p>
                  <span className="block text-xs mt-2 text-gray-400">
                    {new Date(message.timestamp).toLocaleString()}
                  </span>
                </div>
              </div>
            ))}
          </div>

        
          {messages.length > 3 && (
            <button
              onClick={handleToggleAllMessages}
              className="self-center px-4 py-2 bg-gray-200 hover:bg-gray-300 rounded-full text-sm font-semibold text-gray-600 transition"
            >
              {showAllMessages ? "Hide Older Messages" : "Show All Messages"}
            </button>
          )}

         
          <div className="flex items-center space-x-4">
            <textarea
              value={messageContent}
              onChange={(e) => setMessageContent(e.target.value)}
              rows="3"
              placeholder="Type your message..."
              className="flex-1 resize-none p-2 text-lg border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
            <button
              onClick={handleSendMessage}
              disabled={loading}
              className={`px-6 py-3 rounded-lg ${
                loading
                  ? "bg-gray-400 cursor-not-allowed"
                  : "bg-blue-500 text-white hover:bg-blue-600"
              }`}
            >
              {loading ? "Sending..." : "Send"}
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default MessagesList;
