
import React, { useEffect, useState } from 'react';
import { StreamChat } from 'stream-chat';
import {
  Chat,
  Channel,
  ChannelHeader,
  ChannelList,
  MessageList,
  MessageInput,
  Thread,
  Window,
} from 'stream-chat-react';
import '@stream-io/stream-chat-css/dist/css/index.css';

const filters = { type: 'messaging' };
const options = { state: true, presence: true, limit: 10 };
const sort = { last_message_at: -1 };

const client = StreamChat.getInstance('zneq3wtdjzdh');

const App = () => {

  const [clientReady, setClientReady] = useState(false);

  const  [channel,setChannel]=useState(null)//use state reacta özgü bir kavram-state durumunu güncellemek için kullanılır
  //state channel ->channnel değer,n, değiştiricek- başlangıç olarak ta stati null olsun
  //channel i burada set edince return içerisindeki yapıya gönderm,iş oluyoruz

  useEffect(() => {
    const setupClient = async () => {
      try {
        await client.connectUser(
          {
            id: 'dave-matthews',
            name: 'Dave Matthews',
          },
          'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyX2lkIjoiZGF2ZS1tYXR0aGV3cyJ9.EJdBQHJvxYNP9IhjnrI49qTCVzNHoBDBX9jxx2CwDg0',

        );
        const channel = await client.channel('gaming','gaming-demo',{
          name:'Gaming Demo',
        })
        setChannel(channel) //channeli set ediyor


        setClientReady(true);
      } catch (err) {
        console.log(err);
      }
    };

    setupClient();
  }, []);
  //custom isteğine bağlı clientte customStyles={customStyle} yazmna gerek
  const customStyle= {
    '--primary-color': 'green',
    '--md-font': '1.2rem',
    '--xs-m': '1.2rem',
    '--xs-p': '1.2rem',
  };

  if (!clientReady) return null;

  return (
    <Chat client={client} darkMode={true} >
      <ChannelList filters={filters} sort={sort} options={options} />
      <Channel channel={channel}>
        <Window>
          <ChannelHeader />
          <MessageList />
          <MessageInput />
        </Window>
        <Thread />
      </Channel>
    </Chat>
  );
};


export default App;
