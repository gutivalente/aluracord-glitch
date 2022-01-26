import { Box, Text, TextField, Image, Button } from '@skynexui/components';
import React from 'react';
import appConfig from '../config.json';

export default function ChatPage() {
  const [text, setText] = React.useState('');
  const [messages, setMessages] = React.useState([]);

  function handleNewMessage(newText) {
    const newMessage = {
      id: messages.length,
      from: 'Gustavo',
      text: newText
    };
    if (newText) {
      setMessages([newMessage, ...messages]);
      setText('');
    }
  }

  function deleteMessage(id) {
    setMessages(messages.filter(m => m.id !== id));
  }

  return (
    <Box
      styleSheet={{
        display: 'flex', alignItems: 'center', justifyContent: 'center',
        backgroundColor: appConfig.theme.colors.primary['500'],
        backgroundImage: `url(https://cdn.fstoppers.com/styles/large-16-9/s3/lead/2018/10/horror_glitch_photo_lead_image_halloween.jpg)`,
        backgroundRepeat: 'no-repeat', backgroundSize: 'cover', backgroundBlendMode: 'multiply',
        color: appConfig.theme.colors.neutrals['000']
      }}
    >
      <Box
        styleSheet={{
          display: 'flex',
          flexDirection: 'column',
          flex: 1,
          boxShadow: '0 2px 10px 0 rgb(0 0 0 / 20%)',
          borderRadius: '5px',
          backgroundColor: appConfig.theme.colors.neutrals['700'],
          height: '100%',
          maxWidth: '95%',
          maxHeight: '95vh',
          padding: '32px',
        }}
      >
        <Header />

        <Box
          styleSheet={{
            position: 'relative',
            display: 'flex',
            flex: 1,
            height: '80%',
            backgroundColor: appConfig.theme.colors.neutrals['900'],
            flexDirection: 'column',
            borderRadius: '5px',
            padding: '16px',
          }}
        >

          <MessageList thatMessages={messages} thatDeleteMessage={deleteMessage} />

          <Box
            as='form'
            styleSheet={{
              display: 'flex',
              alignItems: 'center',
            }}
          >

            <TextField
              placeholder='Insira sua mensagem aqui...'
              type='textarea'
              styleSheet={{
                width: '100%',
                border: '0',
                resize: 'none',
                borderRadius: '5px',
                padding: '6px 8px',
                backgroundColor: appConfig.theme.colors.neutrals['800'],
                marginRight: '12px',
                color: appConfig.theme.colors.neutrals['200'],
              }}
              value={text}
              onChange={event => {
                const value = event.target.value;
                setText(value);
              }}
              onKeyPress={event => {
                if (event.key === 'Enter') {
                  event.preventDefault();
                  handleNewMessage(text);
                }
              }}
            />

            <Button
              type='submit'
              label='Send'
              buttonColors={{
                contrastColor: appConfig.theme.colors.neutrals['000'],
                mainColor: appConfig.theme.colors.primary['500'],
                mainColorLight: appConfig.theme.colors.primary['400'],
                mainColorStrong: appConfig.theme.colors.primary['600'],
              }}
              onClick={event => {
                event.preventDefault();
                handleNewMessage(text);
              }}
            />

          </Box>
        </Box>
      </Box>
    </Box>
  )
}

function Header() {
  return (
    <>
      <Box styleSheet={{ width: '100%', marginBottom: '16px', display: 'flex', alignItems: 'center', justifyContent: 'space-between' }} >
        <Text variant='heading5'>
          Chat
        </Text>

        <Button
          variant='tertiary'
          colorVariant='neutral'
          label='Logout'
          href='/'
        />
      </Box>
    </>
  )
}

function MessageList(props) {
  return (
    <Box
      tag='ul'
      styleSheet={{
        overflowY: 'auto',
        display: 'flex',
        flexDirection: 'column-reverse',
        flex: 1,
        color: appConfig.theme.colors.neutrals['000'],
        marginBottom: '16px',
      }}
    >
      {props.thatMessages.map(thatMessage => {
        return (
          <Text
            key={thatMessage.id}
            tag='li'
            styleSheet={{
              borderRadius: '5px',
              padding: '6px',
              marginBottom: '12px',
              hover: {
                backgroundColor: appConfig.theme.colors.neutrals['700'],
              }
            }}
          >

            <Box
              styleSheet={{
                marginBottom: '8px',
              }}
            >

              <Image
                styleSheet={{
                  width: '20px',
                  height: '20px',
                  borderRadius: '50%',
                  display: 'inline-block',
                  marginRight: '8px',
                }}
                src={`https://github.com/gutivalente.png`}
                alt=''
              />

              <Text tag='strong'>
                {thatMessage.from}
              </Text>

              <Text
                styleSheet={{
                  fontSize: '10px',
                  marginLeft: '8px',
                  color: appConfig.theme.colors.neutrals['300'],
                }}
                tag='span'
              >
                {(new Date().toLocaleDateString())}
              </Text>

              <Button
                iconName='FaWindowClose'
                variant='tertiary'
                colorVariant='primary'
                styleSheet={{
                  position: 'absolute',
                  right: '0'
                }}
                onClick={event => {
                  event.preventDefault();
                  const thisId = thatMessage.id;
                  props.thatDeleteMessage(thisId);
                }}
              />

            </Box>
            {thatMessage.text}
          </Text>
        );
      })}
    </Box>
  )
}