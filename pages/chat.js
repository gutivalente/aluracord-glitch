import { Box, Text, TextField, Image, Button } from '@skynexui/components';
import { createClient } from '@supabase/supabase-js';
import { useRouter } from 'next/router';
import React from 'react';
import appConfig from '../config.json';
import { ButtonSendSticker } from '../src/components/ButtonSendSticker';

const SUPABASE_ANON_KEY = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJyb2xlIjoiYW5vbiIsImlhdCI6MTY0MzMxMTI2MCwiZXhwIjoxOTU4ODg3MjYwfQ.J5Ice1r9WPUtwfjaNCYgQA9NmBSWeSsM43sf41a_Kgg';
const SUPABASE_URL = 'https://okmvidlkjnjbzkgpvgvw.supabase.co';
const supabaseClient = createClient(SUPABASE_URL, SUPABASE_ANON_KEY);

function listenToMessagesInRealTime(insertMessageLocally, deleteMessageLocally) {
  return supabaseClient
    .from('mensagens')
    .on('*', payload => {
      switch (payload.eventType) {
        case 'INSERT':
          insertMessageLocally(payload.new);
          break;
        case 'DELETE':
          deleteMessageLocally(payload.old);
      }
    })
    .subscribe();
}

export default function ChatPage() {
  const routing = useRouter();
  const loggedUser = routing.query.username;
  const [inputText, setInputText] = React.useState('');
  const [messages, setMessages] = React.useState([]);

  React.useEffect(() => {
    loadMessagesFromClient();

    listenToMessagesInRealTime(
      newMessage => {
        setMessages(currentMessages => {
          return [newMessage, ...currentMessages];
        });
      },
      oldMessage => {
        setMessages(currentMessages => {
          return currentMessages.filter(m => m.id !== oldMessage.id);
        });
      }
    );

  }, []);

  function loadMessagesFromClient() {
    supabaseClient
      .from('mensagens')
      .select('*')
      .order('id', { ascending: false })
      .then(({ data }) => {
        setMessages(data);
      });
  }

  function handleNewMessage(text, sender) {
    const newMessage = {
      de: sender,
      texto: text
    };
    insertMessageOnClient(newMessage);
    setInputText('');
  }

  function insertMessageOnClient(newMessage) {
    supabaseClient
      .from('mensagens')
      .insert([newMessage])
      .then(({ data }) => { });
  }

  function deleteMessageOnClient(id) {
    supabaseClient
      .from('mensagens')
      .delete()
      .match({ id })
      .then(({ data }) => { });
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

          <MessageList thatMessages={messages} thatLoggedUser={loggedUser} thatDeleteMessage={deleteMessageOnClient} />

          <Box
            as='form'
            styleSheet={{
              display: 'flex',
              alignItems: 'center',
            }}
          >

            <TextField
              placeholder='type here...'
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
              value={inputText}
              onChange={event => {
                const value = event.target.value;
                setInputText(value);
              }}
              onKeyPress={event => {
                if (event.key === 'Enter') {
                  event.preventDefault();
                  if (inputText) {
                    handleNewMessage(inputText, loggedUser);
                  }
                }
              }}
            />

            <ButtonSendSticker
              onStickerClick={sticker => {
                handleNewMessage(':sticker:' + sticker, loggedUser)
              }} />

            <Button
              type='submit'
              label='Send'
              buttonColors={{
                contrastColor: appConfig.theme.colors.neutrals['000'],
                mainColor: appConfig.theme.colors.primary['500'],
                mainColorLight: appConfig.theme.colors.primary['400'],
                mainColorStrong: appConfig.theme.colors.primary['600'],
              }}
              disabled={!inputText}
              onClick={event => {
                event.preventDefault();
                if (inputText) {
                  handleNewMessage(inputText, loggedUser);
                }
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
                src={`https://github.com/${thatMessage.de}.png`}
                alt=''
              />

              <Text tag='strong'>
                {thatMessage.de}
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

              {
                thatMessage.de === props.thatLoggedUser && (
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
                )
              }


            </Box>
            {
              thatMessage.texto.startsWith(':sticker:') ?
                (<Image src={thatMessage.texto.replace(':sticker:', '')} alt='' />) :
                (thatMessage.texto)
            }
          </Text>
        );
      })}
    </Box>
  )
}
