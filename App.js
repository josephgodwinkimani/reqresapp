/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow strict-local
 */

import React, { Component } from 'react';
import {
  Modal,
  SafeAreaView,
  Platform,
  StyleSheet,
  Text,
  FlatList,
  TouchableOpacity,
  View,
} from 'react-native';

const API_URL = 'https://reqres.in/api/users';

const listViewItemSeparator = () => {
  return (
    <View
      style={{
        height: 1,
        width: '100%',
        backgroundColor: '#000'
      }}
    />
  );
};


class App extends Component {

  constructor(props) {
    super(props);
    this.state = {
      isLoading: true,
      items: []
    }
  }

  componentDidMount() {

    return fetch(API_URL, {
      method: 'GET',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'

      }

    }).then((response) => response.json())
      .then((responseJson) => {

        this.setState({
          items: responseJson.data,
          isLoading: false,
        });
      })
      .catch((error) => {
        console.error(error);
      });
  }


  render() {

    return (

      <SafeAreaView style={{ flex: 1 }}>
        <View style={{ flex: 1 }}>


          <FlatList
            data={this.state.items}
            ItemSeparatorComponent={listViewItemSeparator}
            keyExtractor={(item, index) => index.toString()}
            renderItem={({ item }) =>
              <View key={item.id} style={{ padding: 20 }}>
                <TouchableOpacity>
                  <Text style={styles.itemsStyle}> Id: {item.id} </Text>
                  <Text style={styles.itemsStyle}> Email: {item.email} </Text>
                  <Text style={styles.itemsStyle}> First Name: {item.first_name} </Text>
                  <Text style={styles.itemsStyle}> Last Name: {item.last_name} </Text>

                </TouchableOpacity>
              </View>
            }
          />

        </View>


      </SafeAreaView>

    );
  }
}

const CustomProgressBar = ({ visible }) => (
  <Modal onRequestClose={() => null} visible={visible}>
    <View style={styles.ModalOuterView}>
      <View style={styles.ModalInnerView}>
        <Text style={{ fontSize: 20, fontWeight: '200' }}>Connecting...</Text>
        <ActivityIndicator size="large" />
      </View>
    </View>
  </Modal>
);

const styles = StyleSheet.create({
  ItemsContainer: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    paddingTop: (Platform.OS === 'ios') ? 20 : 0
  },
  ModalOuterView: {
    flex: 1,
    backgroundColor: '#dcdcdc',
    alignItems: 'center',
    justifyContent: 'center'
  },
  ModalInnerView: {
    borderRadius: 10,
    backgroundColor: 'white',
    padding: 25
  },
  itemsStyle: {
    fontSize: 22,
    color: '#000'
  },
});

export default App;
