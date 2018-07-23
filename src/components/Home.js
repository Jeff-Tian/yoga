import React from "react"
import View from "./View"
import {getCurrentUser} from "../secure/auth"

const Home = () => {
    const {name} = getCurrentUser()

    return (
        <View title="Your Profile">
            <p>Welcome back, {name}!</p>
        </View>
    )
}

export default Home
