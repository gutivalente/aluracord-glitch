import { Box, Button, Image, Text, TextField } from '@skynexui/components';
import { useRouter } from 'next/router';
import React from 'react';
import appConfig from '../config.json';

function Titulo(props) {
  const Tag = props.tag || 'h1';
  return (
    <>
      <Tag>{props.children}</Tag>
      <style jsx>{`
            ${Tag} {
                color: ${appConfig.theme.colors.primary['300']};
                font-size: 24px;
                font-weight: 600;
            }
            `}</style>
    </>
  );
}

// Componente React
// function HomePage() {
//     // JSX
//     return (
//         <div>
//             <GlobalStyle />
//             <Titulo tag="h2">Boas vindas de volta!</Titulo>
//             <h2>Discord - Alura Matrix</h2>
//         </div>
//     )
// }
// export default HomePage

export default function PaginaInicial() {
  const [username, setUsername] = React.useState('');
  // const [userData, setUserData] = useState({});
  const routing = useRouter();
  // const fetchData = () => {
  //   return fetch(`https://api.github.com/users/${username}`)
  //     .then(res => res.json())
  //     .then(data => console.log(data));
  // }

  // useEffect(() => {
  //   fetchData();
  // });

  return (
    <>
      <Box
        styleSheet={{
          display: 'flex', alignItems: 'center', justifyContent: 'center',
          backgroundColor: appConfig.theme.colors.primary['500'],
          backgroundImage: 'url(https://cdn.fstoppers.com/styles/large-16-9/s3/lead/2018/10/horror_glitch_photo_lead_image_halloween.jpg)',
          backgroundRepeat: 'no-repeat', backgroundSize: 'cover', backgroundBlendMode: 'multiply',
        }}
      >
        <Box
          styleSheet={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            flexDirection: {
              xs: 'column',
              sm: 'row',
            },
            width: '100%', maxWidth: '700px',
            borderRadius: '5px', padding: '32px', margin: '16px',
            boxShadow: '0 2px 10px 0 rgb(0 0 0 / 20%)',
            backgroundColor: appConfig.theme.colors.neutrals['700'],
          }}
        >
          {/* Formulário */}
          <Box
            as="form"
            styleSheet={{
              display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center',
              width: { xs: '100%', sm: '50%' }, textAlign: 'center', marginBottom: '32px',
            }}
            onSubmit={event => {
              event.preventDefault();
              routing.push('/chat');
            }}
          >
            <Titulo tag="h2">you are not welcome</Titulo>
            <Text variant="body3" styleSheet={{ marginBottom: '32px', color: appConfig.theme.colors.primary['600'] }}>
              {appConfig.name}
            </Text>

            <TextField
              fullWidth
              textFieldColors={{
                neutral: {
                  textColor: appConfig.theme.colors.neutrals['200'],
                  mainColor: appConfig.theme.colors.neutrals['900'],
                  mainColorHighlight: appConfig.theme.colors.primary['500'],
                  backgroundColor: appConfig.theme.colors.neutrals['800'],
                },
              }}
              value={username}
              onChange={event => {
                const value = event.target.value;
                setUsername(value);
                // fetchData();
              }}
            />

            <Button
              type='submit'
              label='Enter anyway'
              fullWidth
              buttonColors={{
                contrastColor: appConfig.theme.colors.neutrals['000'],
                mainColor: appConfig.theme.colors.primary['500'],
                mainColorLight: appConfig.theme.colors.primary['400'],
                mainColorStrong: appConfig.theme.colors.primary['600'],
              }}
            />
          </Box>
          {/* Formulário */}


          {/* Photo Area */}
          <Box
            styleSheet={{
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              maxWidth: '200px',
              padding: '16px',
              backgroundColor: appConfig.theme.colors.neutrals['800'],
              border: '1px solid',
              borderColor: appConfig.theme.colors.neutrals['999'],
              borderRadius: '10px',
              flex: 1,
              minHeight: '240px',
            }}
          >
            <Image
              styleSheet={{
                borderRadius: '8%',
                marginBottom: '16px',
              }}
              src={
                username.length > 2 ?
                  `https://github.com/${username}.png` :
                  'https://media1.giphy.com/media/l378vMZ1IbLcmj3H2/giphy.gif'
              }
              alt=''
            />
            <Text
              variant="body4"
              styleSheet={{
                color: appConfig.theme.colors.neutrals['200'],
                backgroundColor: appConfig.theme.colors.neutrals['900'],
                padding: '3px 10px',
                borderRadius: '1000px'
              }}
            >
              {/* {userData.name} */}
              {username}
            </Text>
          </Box>
          {/* Photo Area */}
        </Box>
      </Box>
    </>
  );
}
