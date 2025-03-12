import React, {useState} from "react"
import {useAuth} from "~service/auth/UseAuth";
import {SignInForm} from "~login";
import {apiClient} from "~service/api";

export function SyncBookmark() {
    const [status, setStatus] = useState("")
    const [isLoading, setIsLoading] = useState(false)

    const {user} = useAuth()


    console.log("user", user)
    if (!user?.isLoggedIn) {
        return <SignInForm/>
    }

    const syncBookmarks = async () => {
        try {
            setIsLoading(true)
            setStatus("Fetching bookmarks...")

            // Get Chrome bookmarks
            const bookmarkTree = await chrome.bookmarks.getTree()


            await apiClient.post("/bookmarks", bookmarkTree[0])

            setStatus("Sync completed successfully!")
        } catch (error) {
            console.error("Error syncing bookmarks:", error)
            setStatus(`Error: ${error.message}`)
        } finally {
            setIsLoading(false)
        }
    }

    return (
        <div style={{padding: 16, width: 300}}>
            <h2 style={{marginBottom: 16}}>Bookmarks Sync</h2>

            <button
                onClick={syncBookmarks}
                disabled={isLoading}
                style={{
                    padding: "8px 16px",
                    backgroundColor: "#4285f4",
                    color: "white",
                    border: "none",
                    borderRadius: 4,
                    cursor: isLoading ? "default" : "pointer",
                    width: "100%",
                    opacity: isLoading ? 0.7 : 1
                }}>
                {isLoading ? "Syncing..." : "Sync Bookmarks"}
            </button>

            {status && (
                <div style={{
                    marginTop: 16,
                    padding: 8,
                    backgroundColor: status.includes("Error") ? "#ffeeee" : "#eeffee",
                    borderRadius: 4
                }}>
                    {status}
                </div>
            )}

        </div>
    )
}