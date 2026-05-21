import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import API from "../api/api";

function Reader() {

    const { id } = useParams();

    const [book, setBook] = useState(null);
    const [chapters, setChapters] = useState([]);
    const [currentChapter, setCurrentChapter] = useState(null);

    // LOAD BOOK
    const fetchBook = async () => {

        try {

            const res = await API.get(`/books/${id}`);

            setBook(res.data);

        } catch (err) {

            console.log(err);

        }
    };


    // LOAD CHAPTERS
    const fetchChapters = async () => {

        try {

            const res = await API.get(`/chapters/${id}`);

            setChapters(res.data);

        } catch (err) {

            console.log(err);

        }
    };

    useEffect(() => {
        fetchBook();
        fetchChapters();
    }, [id]);

    return (
        <div style={{ padding: "20px" }}>

            {book && (
                <>
                    <h1>{book.title}</h1>
                    <p>{book.description}</p>
                </>
            )}

            <hr />

            <h2>📚 Chapters</h2>

            {chapters.map((ch, index) => (
                <div
                    key={ch._id}
                    style={{
                        border: "1px solid #ccc",
                        padding: "10px",
                        marginBottom: "10px",
                        cursor: "pointer"
                    }}
                    onClick={() => setCurrentChapter(ch)}
                >
                    <h3>{index + 1}. {ch.title}</h3>
                </div>
            ))}

            {currentChapter && (
    <div style={{
        marginTop: "20px",
        padding: "20px",
        border: "2px solid black"
    }}>
        <h2>{currentChapter.title}</h2>

        <p>{currentChapter.content}</p>

        {/* ⭐ BOOKMARK BUTTON */}
        <button
            onClick={async () => {

                try {

                    await API.put(
                        `/users/bookmark/${currentChapter._id}`,
                        {},
                        {
                            headers: {
                                Authorization:
                                    localStorage.getItem("token")
                            }
                        }
                    );

                    alert("Chapter Bookmarked ⭐");

                } catch (err) {

                    alert(err.response.data.message);

                }

            }}
        >
            ⭐ Bookmark Chapter
        </button>

    </div>
)}

                </div>
            )}

       



export default Reader;