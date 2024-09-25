import {useState} from 'react'
import './App.css'
import PushAppTemplatePreview from "./components/notification-preview";
import NTextEditor from "./components/n-text-editor";

function App() {
    const [count, setCount] = useState(0)

    return (
        <>
            <PushAppTemplatePreview />

            <NTextEditor />
        </>
    )
}

export default App
