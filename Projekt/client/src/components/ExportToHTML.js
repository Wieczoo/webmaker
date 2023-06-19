import React from 'react';
import ReactDOMServer from 'react-dom/server';

const exportToHTML = (sections) => {
  const htmlSections = sections.map((section, sectionIndex) => {
    
    const sectionComponents = section.components.map((component, componentIndex) => {
      if (component.type === 'Header') {
        return (
            ReactDOMServer.renderToString(<h1 key={componentIndex} style={component.style}>
            {component.value}
          </h1>).replace('\'', '')
         
        );
      } else if (component.type === 'Paragraph') {
        return (
            ReactDOMServer.renderToStaticMarkup(<p key={componentIndex} style={component.style}>
            {component.value}
          </p>).replace('\'', '')
        );
      } else if (component.type === 'Image') {
        return (
            ReactDOMServer.renderToStaticMarkup(<img
            key={componentIndex}
            src={component.imageUrl}
            alt="Image"
            style={component.style}
          />).replace('\'', '')
        );
      } else {
        return null;
      }
    });
    

    return (
        ReactDOMServer.renderToString(<div key={sectionIndex} style={{ display: section.layout === 'column' ? 'flex' : 'block' }}>
        </div>).replace('></', ">" + sectionComponents.join('') + "</" )
    );
  });
debugger;
  const htmlString = `
    <!DOCTYPE html>
    <html>
      <head>
        <title>My Website</title>
        <style>
          /* Add any additional CSS styles here */
        </style>
      </head>
      <body>
        ${htmlSections.join('')}
      </body>
    </html>
  `;

  return htmlString;
};

export default exportToHTML;
