import React, {Component} from "react";
import {Card, ListItem} from "react-native-elements";
import {FlatList, ScrollView, Text, View} from "react-native";
import {HISTORIA} from "../common/historia";
import {baseUrl} from "../common/common";
import { connect } from 'react-redux';
import {IndicadorActividad} from "./IndicadorActividadComponent";

const mapStateToProps = state => {
    return {
        actividades: state.actividades
    }
}

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
            leftAvatar={{source: {uri: baseUrl + item.imagen}}}
        />
    )
}


class QuienesSomos extends Component{
    constructor(props) {
        super(props);
        this.state = {
            historia: HISTORIA,
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
                        {this.props.actividades.isLoading &&
                            <IndicadorActividad />
                        }
                        {!this.props.actividades.isLoading &&
                            <FlatList
                                data={this.props.actividades.actividades}
                                renderItem={renderActividadesItem}
                                keyExtractor={item => item.id.toString()}
                            />
                        }
                    </Card>
                </View>
            </ScrollView>
        )
    }
}
export default connect(mapStateToProps)(QuienesSomos);
