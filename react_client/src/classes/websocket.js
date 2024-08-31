class WebSocketManager {
    constructor() {
        this.socket = null;
        this.listeners = [];
    }

    connect(url) {
        if (this.socket) return; // Already connected

        this.socket = new WebSocket(url);

        this.socket.onmessage = (event) => {
            this.listeners.forEach(callback => callback(JSON.parse(event.data)));
        };

        this.socket.onopen = () => {
            console.log('WebSocket connected');
        };

        this.socket.onclose = () => {
            console.log('WebSocket disconnected');
            this.socket = null;
        };

        this.socket.onerror = (error) => {
            console.error('WebSocket error:', error);
        };
    }

    addListener(callback) {
        this.listeners.push(callback);
    }

    sendMessage(message) {
        if (this.socket) {
            this.socket.send(JSON.stringify(message));
        } else {
            console.warn('WebSocket not connected');
        }
    }
}

const webSocketManager = new WebSocketManager();
export default webSocketManager;