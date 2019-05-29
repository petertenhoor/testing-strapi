import React from 'react';
import {TouchableOpacity, Text} from "react-native";
import {createStackNavigator, createDrawerNavigator, createAppContainer} from 'react-navigation';

import EventArchive from "./EventArchive";
import EventDetail from "./EventDetail";

const EventArchiveNavigator = createStackNavigator(
    {
        EventArchiveStack: {
            screen: EventArchive,
            navigationOptions: ({navigation}) => ({
                title: "Events",
                headerStyle: {
                    backgroundColor: '#d34f48',
                },
                headerTintColor: '#fff',
                headerTitleStyle: {
                    fontWeight: 'bold',
                },
                headerRight: (
                    <TouchableOpacity onPress={() => navigation.toggleDrawer()} activeOpacity={0.75} style={{marginRight: 15}}>
                        <Text style={{color: "#fff"}}>
                            Menu
                        </Text>
                    </TouchableOpacity>
                )
            })
        },
        EventDetailStack: {
            screen: EventDetail,
            navigationOptions: ({navigation}) => ({
                headerStyle: {
                    backgroundColor: '#d34f48',
                },
                headerTintColor: '#fff',
                headerTitleStyle: {
                    fontWeight: 'bold',
                },
                headerRight: (
                    <TouchableOpacity onPress={() => navigation.toggleDrawer()} activeOpacity={0.75} style={{marginRight: 15}}>
                        <Text style={{color: "#fff"}}>
                            Menu
                        </Text>
                    </TouchableOpacity>
                )
            })
        },
        initialRouteName: "EventArchive"
    }
)

const AppRouter = createDrawerNavigator(
    {
        EventArchive: EventArchiveNavigator
    },
    {
        initialRouteName: "EventArchive"
    }
)

export default createAppContainer(AppRouter)