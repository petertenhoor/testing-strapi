import React, {PureComponent, Fragment} from "react";
import {TouchableOpacity, ScrollView, Text, View, StyleSheet, Image, FlatList} from "react-native";
import moment from "moment"
import {ApolloConsumer} from "react-apollo";
import gql from "graphql-tag";

import autoBind from "./../utils/autoBind";
import Loader from "../components/Loader";

const GET_EVENT_BY_ID = gql`
 query Event($id: ID!) {
  event(id: $id) {
   id
    event_title
    event_date
    event_image {
      url
      name
    }
    talks {
      id
      talk_name
      talk_time
      talk_description
      speakers {
        id
        speaker_name
        speaker_job
        speaker_photo {
          url
          name
        }
        speaker_biography
      }
    }
  }
}`

@autoBind
class EventDetail extends PureComponent {

    state = {
        loading: true,
        data: {}
    }

    onEventFetched(data) {
        this.setState({data: data, loading: false}, () => {
            console.log(this.props.navigation)
        })
    }

    /**
     * Render lifecycle
     * @returns {*}
     */
    render() {
        if (this.state.loading === true) {
            return (
                <Fragment>
                    <Loader/>
                    <ApolloConsumer>
                        {client => {
                            client.query({
                                query: GET_EVENT_BY_ID,
                                variables: {id: this.props.navigation.getParam("eventId", "0")}
                            }).then(({data}) => {
                                this.onEventFetched(data.event)
                            }).catch((err) => {
                                return (
                                    <View style={{flex: 1}}>
                                        <Text>Error</Text>
                                    </View>
                                )
                            })
                        }}
                    </ApolloConsumer>
                </Fragment>
            )
        } else {
            const {event_image, event_title, event_date, talks} = this.state.data
            return (
                <ScrollView style={{flex: 1}}>

                    <Image title={event_image.name}
                           resizeMode="cover"
                           style={styles.cardImage}
                           source={{uri: `https://c76ea342.ngrok.io${event_image.url}`}}/>

                    <View style={{flex: 1, margin: 15}}>

                        {event_title && event_title !== '' ? (
                            <Text style={styles.cardTitle}>
                                {event_title}
                            </Text>
                        ) : null}

                        {event_date && event_date !== '' ? (
                            <Text style={styles.cartDate}>
                                {moment(event_date).format('MMMM Do YYYY, h:mm a')}
                            </Text>
                        ) : null}

                        <Text style={styles.heading}>
                            Schedule
                        </Text>

                        {talks.length > 0 ? (
                            <FlatList data={talks.map((talk) => Object.assign(talk, {key: talk.id}))}
                                      renderItem={({item}) => {
                                          return (
                                              <View style={styles.talkItem}>
                                                  <Text style={styles.talkTitle}>
                                                      {moment(item.talk_time).format('HH:mm')} - {item.talk_name}
                                                  </Text>
                                                  {item.speakers.length > 0 ? (
                                                      <Text style={styles.talkSpeakers}>
                                                          By {item.speakers.map((speaker, index) => `${speaker.speaker_name}${index + 1 !== item.speakers.length ? ` and ` : ``}`)}
                                                      </Text>
                                                  ) : null}
                                              </View>
                                          )
                                      }}
                            />
                        ) : (
                            <Text>
                                There are currently no talks available for this event.
                            </Text>
                        )}

                        <TouchableOpacity style={styles.buttonContainer}
                                          activeOpacity={0.75}
                                          onPress={() => this.props.navigation.navigate('EventArchiveStack')}>

                            <Text style={styles.buttonText}>
                                Back to events
                            </Text>
                        </TouchableOpacity>


                    </View>

                </ScrollView>
            )
        }
    }
}

const styles = StyleSheet.create({
    buttonContainer: {
        flex: 1,
        alignItems: "center",
        justifyContent: "center",
        marginTop: 10,
        backgroundColor: '#d34f48',
        padding: 15,
    },
    buttonText: {
        fontSize: 16,
        fontWeight: "bold",
        color: "#fff"
    },
    cardImage: {
        flex: 1,
        height: 300
    },
    cartContent: {
        flex: 1,
        padding: 15,
        backgroundColor: '#f4f4f4',
        alignItems: 'flex-start'
    },
    cardTitle: {
        fontSize: 20,
        color: '#d34f48',
        fontWeight: 'bold',
    },
    cartDate: {
        fontSize: 14,
        color: '#1c1b1e',
        marginTop: 5
    },
    heading: {
        fontSize: 20,
        color: '#d34f48',
        fontWeight: 'bold',
        marginTop: 15,
        marginBottom: 10
    },
    talkItem: {
        borderWidth: 2,
        borderRadius: 2,
        borderColor: '#ddd',
        backgroundColor: '#f4f4f4',
        shadowColor: '#000',
        shadowOffset: {width: 2, height: 2},
        shadowOpacity: 0.5,
        shadowRadius: 2,
        elevation: 0,
        marginBottom: 10,
        padding: 10,
    },
    talkTitle: {
        fontSize: 16,
        fontWeight: 'bold',
        color: '#1c1b1e'
    },
    talkSpeakers: {
        marginTop: 5,
        fontSize: 14,
        color: '#d34f48'
    }
})

EventDetail.navigationOptions = {
    title: 'Event detail',
}

export default EventDetail;