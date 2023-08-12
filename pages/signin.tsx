import { useState, useEffect } from "react"
import Layout from "../components/layout"
import { getCsrfToken } from "next-auth/react"

var csrfTokenValue = '';

getCsrfToken().then((data) => {
    csrfTokenValue = data || ''
});


export default function () {

    const [csrfToken, setCsrfToken] = useState('')

    if (!csrfToken && csrfTokenValue) {
        setCsrfToken(csrfTokenValue)
    }


    return (
        <Layout>
            <h1>Sign in</h1>
            <div className="page">
                <div className="signin">
                    <div className="card">
                        <div className="provider">
                            <form action="/api/auth/signin/facebook" method="POST">
                                <input type="hidden" name="csrfToken" value={csrfToken}></input>
                                <input type="hidden" name="callbackUrl" value="/me"></input>
                                <button type="submit" className="button">
                                    <span>Sign in with Facebook</span>
                                </button>
                            </form>
                        </div>
                        <div className="provider">
                            <form action="/api/auth/signin/google" method="POST">
                                <input type="hidden" name="csrfToken" value={csrfToken}></input>
                                <input type="hidden" name="callbackUrl" value="/me"></input>
                                <button type="submit" className="button">
                                    Sign in with Google
                                </button>
                            </form>
                        </div>
                    </div>
                </div>
            </div>

        </Layout>
    )
}
