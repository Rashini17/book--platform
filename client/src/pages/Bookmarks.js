import { useEffect, useState } from "react";
import API from "../api/api";

function Bookmarks() {

    const [bookmarks, setBookmarks] = useState([]);

    const fetchBookmarks = async () => {

        try {

            const res = await API.get("/users/dashboard", {
                headers: {
                    Authorization:
                        localStorage.getItem("token")
                }
            });

            setBookmarks(res.data.books || []);

        } catch (err) {

            console.log(err);

        }
    };

    useEffect(() => {
        fetchBookmarks();
    }, []);

    return (
        <div style={{ padding: "20px" }}>

            <h1>⭐ My Bookmarks</h1>

            {bookmarks.map((b) => (
                <div key={b._id}>
                    <h3>{b.title}</h3>
                </div>
            ))}

        </div>
    );
}

export default Bookmarks;