import React, {Component} from "react";
import {FlatList} from "react-native";
import {ListItem} from "react-native-elements";
import * as ROUTES from '../constants/routes';
import {baseUrl} from "../common/common";
import { connect } from 'react-redux';


const mapStateToProps = state => {
    return {
        excursiones: state.excursiones
    }
}

class Calendario extends Component {

    render() {
        const {navigate} = this.props.navigation

        const renderCalendarioItem = ({item, index}) => {

            return(
                <ListItem
                    key={index}
                    title={item.nombre}
                    subtitle={item.descripcion}
                    hideChevron={true}
                    leftAvatar={{source: {uri: baseUrl + item.imagen} }}
                    onPress={() => navigate(ROUTES.DETALLE, { excursionId: item.id })}
                />
            )
        }

        return(
            <FlatList
                data={this.props.excursiones.excursiones}
                renderItem={renderCalendarioItem}
                keyExtractor={item => item.id.toString()}
            />
        )
    }
}

export default connect(mapStateToProps)(Calendario);

