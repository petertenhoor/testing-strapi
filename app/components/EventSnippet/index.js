import React from "react";
import PropTypes from "prop-types";
import {Text, View, Image, TouchableOpacity, StyleSheet} from "react-native";
import moment from "moment";

const EventSnippet = ({id, event_image, event_title, event_date, onNavigate}) => {
    return (
        <TouchableOpacity style={styles.cardContainer}
                          activeOpacity={0.75}
                          onPress={() => onNavigate(id)}>

            {event_image ? (
                <Image title={event_image.name}
                       resizeMode="cover"
                       style={styles.cardImage}
                       source={{uri: `https://c76ea342.ngrok.io${event_image.url}`}}/>
            ) : null}

            <View style={styles.cartContent}>

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

            </View>

        </TouchableOpacity>
    )
}

const styles = StyleSheet.create({
    cardContainer: {
        borderWidth: 2,
        borderRadius: 2,
        borderColor: '#ddd',
        shadowColor: '#000',
        shadowOffset: {width: 2, height: 2},
        shadowOpacity: 0.5,
        shadowRadius: 2,
        elevation: 0,
        marginLeft: 10,
        marginRight: 10,
        marginTop: 10,
    },
    cardImage: {
        flex: 1,
        height: 200
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
        fontWeight: 'bold'
    },
    cartDate: {
        fontSize: 14,
        color: '#1c1b1e',
        marginTop: 5
    }
})

EventSnippet.defaultProps = {
    id: "0",
    event_image: {
        url: '',
        name: '',
    },
    event_title: '',
    event_date: '',
    onNavigate: null
}

EventSnippet.propTypes = {
    id: PropTypes.string.isRequired,
    event_image: PropTypes.shape({
        url: PropTypes.string,
        name: PropTypes.string
    }),
    event_title: PropTypes.string,
    event_date: PropTypes.string,
    onNavigate: PropTypes.func.isRequired
}

export default EventSnippet;