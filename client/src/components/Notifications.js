import { useEffect, useState } from "react";
import { io } from "socket.io-client";

const socket = io("http://localhost:5000");

function Notifications() {

    const [notifications, setNotifications] = useState([]);

    useEffect(() => {

        socket.on("notification", (data) => {

            setNotifications((prev) => [...prev, data]);

        });

    }, []);

    return (
        <div style={{
            position: "fixed",
            top: 10,
            right: 10
        }}>

            {notifications.map((n, i) => (
                <div key={i}
                    style={{
                        background: "#333",
                        color: "white",
                        padding: "10px",
                        marginBottom: "5px"
                    }}
                >
                    {n.message}
                </div>
            ))}

        </div>
    );
}

export default Notifications;