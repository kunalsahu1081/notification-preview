import {useState} from 'react'
import './App.css'
import PushAppTemplatePreview from "./components/notification-preview";
import NTextEditor from "./components/n-text-editor";

function App() {
    const [count, setCount] = useState(0)

    return (
        <div style={{margin: "auto"}}>
            <PushAppTemplatePreview/>


            <div style={{margin: "auto", width: '450px'}}>
                <NTextEditor/>
            </div>
        </div>
    )
}

export default App
