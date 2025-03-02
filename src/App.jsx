import React from "react";
import "./App.scss";

export default function App() {
  const questions = [
    {
      key: 'what',
      prerequisite: null,
      content: {
        en: 'What is this?',
        fr: 'Qu\'est ce que c\'est?'
      },
      awnser: {
        en: "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum.",
        fr: "fr Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum."
      }
    },
    {
      key: 'chat',
      prerequisite: 'what',
      content: {
        en: 'Is this chatGPT?',
        fr: 'Est ce que c\'est chatGPT?'
      },
      awnser: {
        en: "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum.",
        fr: "fr Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum."
      }
    },
  ];

  const [prerequisites, setPrerequisites] = React.useState(new Set());
  const [language, setLanguage] = React.useState('fr');
  const [isLoading, setIsLoading] = React.useState(false);
  const [messages, setMessages] = React.useState([]);
  const [typingMessage, setTypingMessage] = React.useState('');
  const chatBox = React.useRef(null);

  React.useEffect(() => {
    window.scrollTo(0, chatBox.current.scrollHeight);
  }, [messages, typingMessage]);

  function typing(awnser) {
    const array = awnser.split(' ');
    setIsLoading(true);
    let index = 0;

    let interval = null;
    interval = setInterval(() => {
      setTypingMessage((str) => str += array[index++] + ' ');

      if (index === array.length) {
        setIsLoading(false);
        setTypingMessage('');
        setMessages(messages => [...messages, {content: awnser, type: 'bot'}]);
        clearInterval(interval);
      }
    }, 30);
  }

  function addMessage(question, awnser, key) {
    setMessages(messages => [...messages, {content: question, type: 'user'}]);
    setPrerequisites((prerequisites) => Object.assign(prerequisites, {}).add(key))
    typing(awnser);
  }

  return <>
    <div className="header">
      <div className="left">
        <h1>ChatPLG</h1>
        <p>{language === 'fr' ? 'Le premier portefolio alimenté par l\'IA!' : 'The first AI powered portfolio!'}</p>
      </div>
      <div className="right">
        <button onClick={() => setLanguage(language === 'fr' ? 'en' : 'fr')}>{language === 'fr' ? 'en' : 'fr'}</button>
      </div>
    </div>
    <div ref={chatBox} className="chat-box" id="chatBox">
      {messages.map((message, index) => {
        return <div key={index} className={`message ${message.type}`}>{message.content}</div>;
      })}
      {typingMessage !== '' && <div className="message bot">{typingMessage}⬤</div>}
    </div>
    <div className={`input-container ${prerequisites.size > 0 ? 'down': ''}`}>
      {prerequisites.size === 0 && <h2>{language === 'fr' ? 'Comment puis-je vous aider?' : 'How can I help you today?'}</h2>}
      <div className="mid">
        <div className="input">
          <div className="instruction">{language === 'fr' ? 'Veuillez choisir une des options suivantes...' : 'Please choose one of the following...'}</div>
          <div className="input-box">
            {isLoading ? <div className="loader"></div> :
              <>
                {questions.map((question, index) => {
                  if (prerequisites.has(question.key) || (question.prerequisite !== null && !prerequisites.has(question.prerequisite))) {
                    return;
                  }

                  return <button onClick={() => addMessage(question.content[language], question.awnser[language], question.key)} key={index}>
                    {question.content[language]}
                  </button>
                })}
                </>}
          </div>
        </div>
      </div>
    </div>
    <div className="footer">
      <div className="ctn">
        <a href="https://github.com/Spuntagano/" target="_blank" title="Github">
          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 496 512"><path fill="#b4b4b4" d="M165.9 397.4c0 2-2.3 3.6-5.2 3.6-3.3 .3-5.6-1.3-5.6-3.6 0-2 2.3-3.6 5.2-3.6 3-.3 5.6 1.3 5.6 3.6zm-31.1-4.5c-.7 2 1.3 4.3 4.3 4.9 2.6 1 5.6 0 6.2-2s-1.3-4.3-4.3-5.2c-2.6-.7-5.5 .3-6.2 2.3zm44.2-1.7c-2.9 .7-4.9 2.6-4.6 4.9 .3 2 2.9 3.3 5.9 2.6 2.9-.7 4.9-2.6 4.6-4.6-.3-1.9-3-3.2-5.9-2.9zM244.8 8C106.1 8 0 113.3 0 252c0 110.9 69.8 205.8 169.5 239.2 12.8 2.3 17.3-5.6 17.3-12.1 0-6.2-.3-40.4-.3-61.4 0 0-70 15-84.7-29.8 0 0-11.4-29.1-27.8-36.6 0 0-22.9-15.7 1.6-15.4 0 0 24.9 2 38.6 25.8 21.9 38.6 58.6 27.5 72.9 20.9 2.3-16 8.8-27.1 16-33.7-55.9-6.2-112.3-14.3-112.3-110.5 0-27.5 7.6-41.3 23.6-58.9-2.6-6.5-11.1-33.3 2.6-67.9 20.9-6.5 69 27 69 27 20-5.6 41.5-8.5 62.8-8.5s42.8 2.9 62.8 8.5c0 0 48.1-33.6 69-27 13.7 34.7 5.2 61.4 2.6 67.9 16 17.7 25.8 31.5 25.8 58.9 0 96.5-58.9 104.2-114.8 110.5 9.2 7.9 17 22.9 17 46.4 0 33.7-.3 75.4-.3 83.6 0 6.5 4.6 14.4 17.3 12.1C428.2 457.8 496 362.9 496 252 496 113.3 383.5 8 244.8 8zM97.2 352.9c-1.3 1-1 3.3 .7 5.2 1.6 1.6 3.9 2.3 5.2 1 1.3-1 1-3.3-.7-5.2-1.6-1.6-3.9-2.3-5.2-1zm-10.8-8.1c-.7 1.3 .3 2.9 2.3 3.9 1.6 1 3.6 .7 4.3-.7 .7-1.3-.3-2.9-2.3-3.9-2-.6-3.6-.3-4.3 .7zm32.4 35.6c-1.6 1.3-1 4.3 1.3 6.2 2.3 2.3 5.2 2.6 6.5 1 1.3-1.3 .7-4.3-1.3-6.2-2.2-2.3-5.2-2.6-6.5-1zm-11.4-14.7c-1.6 1-1.6 3.6 0 5.9 1.6 2.3 4.3 3.3 5.6 2.3 1.6-1.3 1.6-3.9 0-6.2-1.4-2.3-4-3.3-5.6-2z"/></svg>
        </a>
        <a href="https://www.linkedin.com/in/pierre-luc-gagn%C3%A9-7a807284/" target="_blank" title="LinkedIn">
          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 448 512"><path fill="#b4b4b4" d="M416 32H31.9C14.3 32 0 46.5 0 64.3v383.4C0 465.5 14.3 480 31.9 480H416c17.6 0 32-14.5 32-32.3V64.3c0-17.8-14.4-32.3-32-32.3zM135.4 416H69V202.2h66.5V416zm-33.2-243c-21.3 0-38.5-17.3-38.5-38.5S80.9 96 102.2 96c21.2 0 38.5 17.3 38.5 38.5 0 21.3-17.2 38.5-38.5 38.5zm282.1 243h-66.4V312c0-24.8-.5-56.7-34.5-56.7-34.6 0-39.9 27-39.9 54.9V416h-66.4V202.2h63.7v29.2h.9c8.9-16.8 30.6-34.5 62.9-34.5 67.2 0 79.7 44.3 79.7 101.9V416z"/></svg>
        </a>
        <a href="mailto:pierreluc212@gmail.com" title={language === 'fr' ? 'Courriel' : 'Email'}>
          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512"><path fill="#b4b4b4" d="M256 64C150 64 64 150 64 256s86 192 192 192c17.7 0 32 14.3 32 32s-14.3 32-32 32C114.6 512 0 397.4 0 256S114.6 0 256 0S512 114.6 512 256l0 32c0 53-43 96-96 96c-29.3 0-55.6-13.2-73.2-33.9C320 371.1 289.5 384 256 384c-70.7 0-128-57.3-128-128s57.3-128 128-128c27.9 0 53.7 8.9 74.7 24.1c5.7-5 13.1-8.1 21.3-8.1c17.7 0 32 14.3 32 32l0 80 0 32c0 17.7 14.3 32 32 32s32-14.3 32-32l0-32c0-106-86-192-192-192zm64 192a64 64 0 1 0 -128 0 64 64 0 1 0 128 0z"/></svg>
        </a>
        <a href={language === 'fr' ? 'resume-fr.pdf' : 'resume-en.pdf'} target="_blank" title={language === 'fr' ? 'CV' : 'Resume'}>
          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 384 512"><path fill="#b4b4b4" d="M0 64C0 28.7 28.7 0 64 0L224 0l0 128c0 17.7 14.3 32 32 32l128 0 0 288c0 35.3-28.7 64-64 64L64 512c-35.3 0-64-28.7-64-64L0 64zm384 64l-128 0L256 0 384 128z"/></svg>
        </a>
      </div>
    </div>
  </>;
}
