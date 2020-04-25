import React, {Component} from "react";
import {FlatList} from "react-native";
import {ListItem} from "react-native-elements";
import {EXCURSIONES} from "../common/excursiones";
import * as ROUTES from '../constants/routes';
import {baseUrl} from "../common/common";


class Calendario extends Component {
    constructor(props) {
        super(props);
        this.state = {
            excursiones: EXCURSIONES
        }
    }

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
                data={this.state.excursiones}
                renderItem={renderCalendarioItem}
                keyExtractor={item => item.id.toString()}
            />
        )
    }
}

export default Calendario;

