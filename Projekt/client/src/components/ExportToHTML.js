import React from 'react';
import ReactDOMServer from 'react-dom/server';

const exportToHTML = (pages) => {
//   const htmlSections = sections.map((section, sectionIndex) => {
    
//     const sectionComponents = section.components.map((component, componentIndex) => {
//       if (component.type === 'Header') {
//         return (
//             ReactDOMServer.renderToString(<h1 key={componentIndex} style={component.style}>
//             {component.value}
//           </h1>).replace('\'', '')
         
//         );
//       } else if (component.type === 'Paragraph') {
//         return (
//             ReactDOMServer.renderToStaticMarkup(<p key={componentIndex} style={component.style}>
//             {component.value}
//           </p>).replace('\'', '')
//         );
//       } else if (component.type === 'Image') {
//         return (
//             ReactDOMServer.renderToStaticMarkup(<img
//             key={componentIndex}
//             src={component.imageUrl}
//             alt="Image"
//             style={component.style}
//           />).replace('\'', '')
//         );
//       } else {
//         return null;
//       }
//     });
    

//     return (
//         ReactDOMServer.renderToString(<div key={sectionIndex} style={{ display: section.layout === 'column' ? 'flex' : 'block' }}>
//         </div>).replace('></', ">" + sectionComponents.join('') + "</" )
//     );
//   });
// debugger;
//   const htmlString = `
//     <!DOCTYPE html>
//     <html>
//       <head>
//         <title>My Website</title>
//         <style>
//           /* Add any additional CSS styles here */
//         </style>
//       </head>
//       <body>
//         ${htmlSections.join('')}
//       </body>
//     </html>
//   `;
 let htmlString = [];
const htmlPages = pages.map((page, pageIndex) => {
  //console.log(page)
  
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
debugger;
const pagesHtml = htmlString.map((content)=>{
 return(  `
    <!DOCTYPE html>
    <html>
      <head>
        <title>My Website</title>
        <style>
          /* Add any additional CSS styles here */
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
 
  return pagesHtml;
};
export default exportToHTML;