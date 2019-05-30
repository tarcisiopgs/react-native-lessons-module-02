import React, { Component } from 'react';
import { View, FlatList, ActivityIndicator } from 'react-native';

import Header from '~/components/Header';
import TabIcon from '~/components/TabIcon';
import colors from '~/styles/colors';
import styles from './styles';
import AsyncStorage from '@react-native-community/async-storage';
import api from '~/services/api';
import RepositoryItem from '~/components/RepositoryItem';

export default class Repositories extends Component {
  static navigationOptions = {
    tabBarIcon: <TabIcon name="list-alt" tintColor={colors.white} />,
  };

  state = {
    data: [],
    loading: true,
    refreshing: false,
  };

  componentDidMount() {
    this.loadRepositories();
  }

  loadRepositories = async () => {
    this.setState({ refreshing: true });
    const username = await AsyncStorage.getItem('@Githuber:username');
    const { data } = await api.get(`/users/${username}/repos`);

    this.setState({ data, loading: false, refreshing: false });
  };

  renderListItem = ({ item }) => <RepositoryItem repository={item} />;

  renderList = () => {
    const { data, refreshing } = this.state;

    return (
      <FlatList
        data={data}
        keyExtractor={repo => String(repo.id)}
        renderItem={this.renderListItem}
        onRefresh={this.loadRepositories}
        refreshing={refreshing}
      />
    );
  };

  render() {
    const { loading } = this.state;

    return (
      <View style={styles.container}>
        <Header title="Repositórios" />
        {loading ? (
          <ActivityIndicator style={styles.loading} />
        ) : (
          this.renderList()
        )}
      </View>
    );
  }
}
