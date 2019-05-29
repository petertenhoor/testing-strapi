import React, {PureComponent} from "react";
import {Text, View, ScrollView} from "react-native";
import {Query} from "react-apollo";
import gql from "graphql-tag";

import autoBind from "./../utils/autoBind";
import EventSnippet from "./../components/EventSnippet";
import Loader from "./../components/Loader";

const GET_EVENTS = gql`
{
  events {
    id
    event_title
    event_date
    event_image {
      url
      name
   }
  }
}`

@autoBind
class EventArchive extends PureComponent {

    /**
     * Navigate to detail
     * @param event
     * @param id
     */
    handleNavigateDetail(id) {
        const {navigation} = this.props
        navigation.navigate('EventDetailStack', {eventId: id})
    }

    /**
     * Render lifecycle
     * @returns {*}
     */
    render() {
        return (
            <View style={{flex: 1}}>
                <Query query={GET_EVENTS}>
                    {({loading, error, data}) => {
                        if (error) <Text>Error..</Text>
                        if (loading) return <Loader/>
                        const events = data.events
                        return (
                            <ScrollView>
                                {events.map((event) => {
                                    const {id, event_image, event_title, event_date} = event
                                    return (
                                        <EventSnippet key={id}
                                                      id={id}
                                                      navigation={this.props.navigation}
                                                      event_image={event_image}
                                                      event_title={event_title}
                                                      event_date={event_date}
                                                      onNavigate={this.handleNavigateDetail}/>
                                    )
                                })}
                            </ScrollView>
                        )
                    }}
                </Query>
            </View>
        );
    }
}

EventArchive.navigationOptions = {
    title: 'Events',
}

export default EventArchive;