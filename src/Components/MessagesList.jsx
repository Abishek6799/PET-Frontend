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
      const sortedMessages = response.data.messages?.sort(
        (a, b) => new Date(a.timestamp) - new Date(b.timestamp)
      );
      setMessages(sortedMessages || []);
      setError(null);
    } catch (error) {
      setError("No messages found");
      setMessages([]);
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
        senderId: shelterId,
        senderType: "Shelter",
      });

      if (messageResponse.status === 200 || messageResponse.status === 201) {
        setMessages((prevMessages) => [
          ...prevMessages,
          {
            sender: { id: shelterId, name: "You" },
            content: messageContent,
            timestamp: new Date().toISOString(),
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
        <div className="mt-4 p-6 rounded-md shadow-lg bg-white">
          <h3 className="text-xl font-bold">Messages</h3>
          {error && <p className="text-red-500">{error}</p>}

          {messages.length === 0 && !error && (
            <p>No messages yet. Start a conversation!</p>
          )}

          <div className="messages-container max-h-80 overflow-y-auto border p-2 rounded-md shadow-md mt-4">
            {displayedMessages.map((message, index) => (
              <div
                key={index}
                className={`p-2 my-2 rounded-lg shadow-md ${
                  message.sender?.id === shelterId
                    ? "bg-green-200 text-right"
                    : "bg-gray-200 text-left"
                }`}
              >
                <strong className="text-sm font-semibold">
                  {message.sender?.name === "You" ? "You" : message.sender?.name || "Shelter"}
                </strong>
                <p>{message.content}</p>
                <p className="text-sm text-gray-500">
                  {new Date(message.timestamp).toLocaleString()}
                </p>
              </div>
            ))}
          </div>

          {messages.length > 3 && (
            <button
              onClick={handleToggleAllMessages}
              className="mt-2 px-4 py-2 bg-gray-300 hover:bg-gray-400 rounded-full text-sm"
            >
              {showAllMessages ? "Hide Older Messages" : "Load All Messages"}
            </button>
          )}

          <div className="mt-4">
            <textarea
              value={messageContent}
              onChange={(e) => setMessageContent(e.target.value)}
              rows="3"
              placeholder="Type your message..."
              className="w-full p-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
            <button
              onClick={handleSendMessage}
              disabled={loading}
              className={`mt-2 px-4 py-2 rounded ${
                loading ? "bg-gray-400" : "bg-blue-500 text-white"
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
