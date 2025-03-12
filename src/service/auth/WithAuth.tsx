import React, {type ReactNode} from "react";
import {AuthProvider} from "~service/auth/auth-provider";

export default function WithAuth({children}: { children: ReactNode }) {
    return (
        <AuthProvider>
            {children}
        </AuthProvider>
    )
}