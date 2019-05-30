import React, { Component } from 'react';
import { ActivityIndicator, FlatList, View } from 'react-native';

import Header from '~/components/Header';
import TabIcon from '~/components/TabIcon';
import colors from '~/styles/colors';
import AsyncStorage from '@react-native-community/async-storage';
import api from '~/services/api';
import OrganizationItem from '~/components/OrganizationItem';
import styles from './styles';

export default class Organizations extends Component {
  static navigationOptions = {
    tabBarIcon: <TabIcon name="building" tintColor={colors.white} />,
  };

  state = {
    data: [],
    loading: true,
    refreshing: false,
  };

  componentDidMount() {
    this.loadOrganizations();
  }

  loadOrganizations = async () => {
    this.setState({ refreshing: true });
    const username = await AsyncStorage.getItem('@Githuber:username');
    const { data } = await api.get(`/users/${username}/orgs`);

    this.setState({ data, loading: false, refreshing: false });
  };

  renderListItem = ({ item }) => <OrganizationItem organization={item} />;

  renderList = () => {
    const { data, refreshing } = this.state;

    return (
      <FlatList
        data={data}
        keyExtractor={repo => String(repo.id)}
        numColumns={2}
        columnWrapperStyle={styles.columnWrapper}
        renderItem={this.renderListItem}
        onRefresh={this.loadOrganizations}
        refreshing={refreshing}
      />
    );
  };

  render() {
    const { loading } = this.state;

    return (
      <View style={styles.container}>
        <Header title="Organizações" />
        {loading ? (
          <ActivityIndicator style={styles.loading} />
        ) : (
          this.renderList()
        )}
      </View>
    );
  }
}
