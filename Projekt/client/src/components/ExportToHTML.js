import React from 'react';
import ReactDOMServer from 'react-dom/server';
import axios from 'axios';

function encodeHtmlToBase64(html) {
    
  const htmlBytes = new TextEncoder().encode(html);

  
  const base64 = btoa(String.fromCharCode.apply(null, htmlBytes));

  return base64;
}

const exportToHTML = (pages) => {
 let htmlString = [];
const htmlPages = pages.map((page, pageIndex) => {

  
  const sectionComponents = page.elements.map((component, componentIndex) => {
    
       
    const pageComponents = component.elements.map((element, elementIndex)=>{
        //if(element.type ==' text'){
          //debugger;
        //  return( 
        //   ReactDOMServer.renderToStaticMarkup(<p key={elementIndex} style={element.styles}>{element.text} </p>).replace('\'', '')
        //  )
         if (element.type === 'text') {
          return (
            ReactDOMServer.renderToStaticMarkup(<a
              key={element.id}
              className={`previewText`}
              style={element.styles}           
            >
              {element.text}
            </a>).replace('\'', '')
          );
        }
        else if (element.type === 'image') {
          return (
            ReactDOMServer.renderToStaticMarkup(<img
              alt='image'
              className={`previewText`}
              key={element.id}
              style={element.styles}
              src={element.styles.url}
            ></img>).replace('\'', '')
          );
        }
        else if (element.type === 'button') {
          return (
            ReactDOMServer.renderToStaticMarkup(<a href={element.styles.link}>
            <button
              alt='button'
              className={`previewText`}
              key={element.id}
              style={element.styles}
              src={element.styles.url}
            >
                {element.text}
            </button></a>).replace('\'', '')
          );
        }
        //}
        
      })
      
      return (
        ReactDOMServer.renderToStaticMarkup(<div key={componentIndex} style={component.styles}></div>).replace('\'', '').replace('></', ">" + pageComponents.join('') + "</" )
    );
  });
htmlString.push( sectionComponents.join(''))
})
const pagesHtml = htmlString.map((content)=>{
 return(  `
    <!DOCTYPE html>
    <html>
      <head>
        <title>My Website</title>
        <style>
          *{
            padding:0;
            margin:0;
          }
        </style>
      </head>
      <body style="
        width: 100%;
        max-width: 100%;
        height: 100%;
        overflow-x: hidden;
    ">
        ${content}
      </body>
    </html>
  `)
})
 
 // return pagesHtml;

  const names = pages.map((page)=>{return(
    page.title
)})
const baseHtml = pagesHtml.map((code)=>{
    return (
        encodeHtmlToBase64(code)
    )
});
const exportData = {
Email: localStorage.getItem('email'),
Name: names,
Html: baseHtml
};

// Wykonanie zapytania POST
axios.post( window.$url+'/Export/add', exportData)
.then(response =>{
if(response.data == 'Add onepage'){
    alert("Kup premium zeby zapisywać więcej niz jedną stronę")
} else if(response.data == 'Files exported successfully') {
    alert("Pliki zostały zapisane na serwerze")
}
  console.log(response.data); 
})
.catch(error => {
  console.error(error); 
});
};
export default exportToHTML;