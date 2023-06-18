import { useState } from "react";
import {useNavigate,useLocation} from "react-router-dom";

import '../styles/editor.css';

import icon_desktop from '../assets/desktop.png';
import icon_mobile from '../assets/mobile.png';

import icon_close from '../assets/close.png';
import icon_addPage from '../assets/addPage.png';

import icon_page from '../assets/page.png';

const ApperancePage = () =>{

    const [editorSelector,setEditorSelector] = useState(true);
    const [newPageBlock,setNewPageBlock] = useState(true);
    const [newPageTitle,setNewPageTitle] = useState();
    const [pages,setPages] = useState([]);
    const [selectedPage,setSelectedPage] = useState([]);
    const [selectedObject,setSelectedObject] = useState();
    const [display,setDisplay] = useState(false);
    

    const editorSelectorView = () =>{
        setEditorSelector(!editorSelector);
    }
    const addPage = () =>{
        let temp={
            title: newPageTitle,
            body:{
                id:'',
                class:'',
                tag : 'body',
                style:{
                    background:'#ffffff',
                    height:'100%',
                    width: '100%'
                }
            }
        }
        pages.push(temp);
        setPages(pages);
        setNewPageBlock(false);
    }
    const openPage = async (title) => {
        const source = pages.findIndex(e=>e.title===title);
        setSelectedPage(pages[source]);
        console.log(pages[source]);
        console.log(selectedPage);
        setSelectedObject(pages[source].body);
        setDisplay(true);
    }
    return(
        <>
        {!newPageBlock?null:
        <div id="overlay">
            <div id="modalBox">
                <div id="modalBoxHeader">
                    <h3>New Page</h3>
                    <button onClick={()=>{setNewPageBlock(false)}}><img alt='close' src={icon_close}/></button>
                </div>
                <div id="modalBoxBody">
                    <label>Title</label>
                    <input type='text' onChange={(e)=>{setNewPageTitle(e.target.value)}}/>
                    <button onClick={addPage}>Add page</button>
                </div>
               
                
            </div>
        </div>
        }
            <header>Apperance editor</header>
            <section id="editorSection">
                <div className="editorColumn">
                    <div id="editorHeader">
                    <span>
                        <a>Page:{!display?'':selectedPage.title}</a>
                    </span>
                    <span>
                        <button onClick={editorSelectorView}><img src={icon_page} alt=''></img></button>
                        <div id="editorView">
                            <button><img src={icon_desktop} alt=''></img></button>
                            <button><img src={icon_mobile}  alt=''></img></button>
                        </div>
                        </span>
                    </div>
                    {!editorSelector?null:
                        <div id="editorSelector">
                            <div id="editorSelectorHeader">
                                <h3>My pages</h3>
                                <span>
                                    <button onClick={()=>{setNewPageBlock(true)}}><img alt='img' src={icon_addPage}></img></button>
                                    <button onClick={()=>{setEditorSelector(false)}}><img alt='img' src={icon_close}></img></button>
                                </span>
                            </div>
                            <div id="editorSelectorBody">
                                {pages? pages.map((item,index)=>{
                                    return(
                                        <button key={index} onClick={()=>{openPage(item.title)}}className="page"><img alt='page' src={icon_page}/><a>{item.title}</a></button>
                                    );
                                }):null}
                            </div>
                        </div>
                    }
                    <div id="editorDisplay">
                        {!display ?'':
                        <div style={{background:selectedPage.body.style.background,width:selectedPage.body.style.width,height:selectedPage.body.style.height}}></div>
                        }
                    </div>
                </div>
                <div className="editorColumn">
                    <div id="editorOptions">
                        <h3>Options</h3>
                            {!display ?'':
                                <span>
                                    <label>ID</label>
                                    <input type='text' value={selectedObject.id}/>
                                    <label>Class</label>
                                    <input type='text' value={selectedObject.class}/>

                                    <label>Background</label>
                                    <input type='color' defaultValue={selectedObject.style.background} onChange={(e)=>{selectedObject.style.background = e.target.value}}/>
                                </span>
                            }
                    </div>
                </div>
            </section>
        </>
    );
}

export default ApperancePage;