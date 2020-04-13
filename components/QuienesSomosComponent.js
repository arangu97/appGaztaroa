import React, {Component} from "react";
import {Card, ListItem} from "react-native-elements";
import {FlatList, ScrollView, Text, View} from "react-native";
import {HISTORIA} from "../common/historia";
import {ACTIVIDADES} from "../common/actividades";


function Historia(props) {

    const historia = props.historia;

    if (historia) {
        return(
            <Card
                title={historia.titulo}
            >
                <Text style={{margin: 10}}>
                    {historia.descripcion}
                </Text>
            </Card>
        )
    } else {
        return (<View></View>)
    }
}

const renderActividadesItem = ({item, index}) => {

    return(
        <ListItem
            key={index}
            title={item.nombre}
            subtitle={item.descripcion}
            hideChevron={true}
            leftAvatar={{ source: require('./imagenes/40Años.png')}}
        />
    )
}


class QuienesSomos extends Component{
    constructor(props) {
        super(props);
        this.state = {
            historia: HISTORIA,
            actividades: ACTIVIDADES
        }
    }
    render() {
        return(
            <ScrollView>
                <Historia historia={this.state.historia}/>
                <View>
                    <Card
                        title='Actividades y recursos'
                    >
                        <FlatList
                            data={this.state.actividades}
                            renderItem={renderActividadesItem}
                            keyExtractor={item => item.id.toString()}
                            />
                    </Card>
                </View>
            </ScrollView>
        )
    }
}
export default QuienesSomos;
