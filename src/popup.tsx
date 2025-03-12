import React from "react"
import WithAuth from "~service/auth/WithAuth";
import {SyncBookmark} from "~sync-bookmark";
import "~styles/global.css"

function IndexPopup() {
    return (
        <WithAuth>
            <SyncBookmark/>
        </WithAuth>
    )
}

export default IndexPopup