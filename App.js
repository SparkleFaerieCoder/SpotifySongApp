/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow strict-local
 */

import React from 'react';
import {
  Button,
  FlatList,
  KeyboardAvoidingView,
  RefreshControl,
  SafeAreaView,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
} from 'react-native';
import {ApiScope, auth as SpotifyAuth} from 'react-native-spotify-remote';

// Api Config object, replace with your own applications client id and urls
const spotifyConfig = {
  clientID: '518b92ac0008406caff7b3c2e2520f38',
  redirectURL: 'spotifySongApp://callback',
  scopes: [ApiScope.UserLibraryReadScope],
};

const App = () => {
  const [token, setToken] = React.useState(undefined);
  const [isLoading, setLoading] = React.useState(false);
  const [albums, setAlbums] = React.useState([]);
  const [notes, setNotes] = React.useState({});
  const [selected, setSelected] = React.useState(undefined);
  const [inputValue, setInputValue] = React.useState('');
  const refInput = React.createRef(null);

  const auth = async () => {
    try {
      const session = await SpotifyAuth.authorize(spotifyConfig);
      setToken(session.accessToken);
    } catch (err) {
      console.error("Couldn't authorize with or connect to Spotify", err);
    }
  };

  const fetchList = () => {
    setLoading(true);
    if (token) {
      const url = 'https://api.spotify.com/v1/me/albums';
      const options = {
        method: 'GET',
        headers: {
          Accept: 'application/json',
          'Content-Type': 'application/json;charset=UTF-8',
          Authorization: `Bearer ${token}`,
        },
      };

      fetch(url, options)
        .then((response) => response.json()) // one extra step
        .then((data) => {
          const albums = data.items.map((item, index) => {
            return {
              id: item.album.id,
              title: item.album.name,
              artists: item.album.artists.map((artist) => artist.name),
            };
          });
          setAlbums(albums);
        })
        .catch((err) => console.log('err', err));
    } else {
      auth();
    }
    setLoading(false);
  };

  const createAlbumNote = (album) => {
    setLoading(true);
    fetch('https://jsonplaceholder.typicode.com/posts', {
      method: 'POST',
      body: JSON.stringify({
        albumId: album.id,
        value: inputValue,
      }),
      headers: {
        'Content-type': 'application/json; charset=UTF-8',
      },
    })
      .then((response) => response.json())
      .then((data) => {
        setNotes({...notes, [data.albumId]: data});
        setSelected(undefined);
      })
      .catch((err) => console.log('error', err));

    setTimeout(() => {
      setLoading(false);
    }, 200);
  };

  React.useEffect(() => {
    console.log('refreash');
    if (token) fetchList();
  }, [token]);

  React.useEffect(() => {
    if (selected) {
      refInput.current.focus();
    }
  }, [selected]);

  const renderItem = ({item, index}) => {
    const note = notes[item.id]?.value;
    return (
      <TouchableOpacity
        style={styles.album}
        onPress={(ref) => {
          setSelected(item.id);
        }}>
        <Text style={styles.title}>{item.title}</Text>
        {selected === item.id ? (
          <>
            <TextInput
              ref={refInput}
              style={styles.input}
              defaultValue={note}
              onChangeText={(text) => setInputValue(text)}
              placeholder={'Add a note'}
              blurOnSubmit={true}
              onSubmitEditing={() => createAlbumNote(item)}
            />
            <Button onPress={() => createAlbumNote(item)} title={'Save'} />
          </>
        ) : (
          <Text style={{textAlign: 'center', color: note ? 'black' : 'blue'}}>
            {note || 'Add a note'}
          </Text>
        )}
      </TouchableOpacity>
    );
  };

  return (
    <>
      <SafeAreaView style={styles.container}>
        <Text style={styles.header}>My Spotify Albums</Text>
        {token ? (
          <KeyboardAvoidingView
            behavior="padding"
            style={{flex: 1}}
            keyboardVerticalOffset={50}>
            <FlatList
              data={albums}
              renderItem={renderItem}
              keyExtractor={(item) => {
                return item.id;
              }}
              scrollEnabled={true}
              refreshControl={
                <RefreshControl refreshing={isLoading} onRefresh={fetchList} />
              }
            />
          </KeyboardAvoidingView>
        ) : (
          <Button
            onPress={() => fetchList()}
            title={'Login to Spotify'}
            isLoading={isLoading}
          />
        )}
      </SafeAreaView>
    </>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  header: {
    fontSize: 24,
    marginBottom: 15,
  },
  title: {
    textAlign: 'center',
    fontSize: 16,
    marginVertical: 5,
  },
  album: {
    flex: 1,
    justifyContent: 'center',
    marginBottom: 10,
    padding: 5,
    borderWidth: 0.5,
  },
  input: {
    margin: 5,
    padding: 5,
    backgroundColor: 'lightgrey',
  },
});

export default App;
