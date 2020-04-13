import React, {Component} from "react";
import {CONTACTO} from "../common/contacto";
import {Text} from "react-native";
import {Card} from "react-native-elements";

class Contacto extends Component{
    constructor(props) {
        super(props);
        this.state = {
            contacto: CONTACTO
        }
    }

    render() {
        const {contacto} = this.state
        return(
            <Card
                title={contacto.titulo}
            >
                <Text
                    style={{margin: 10}}
                >
                    {contacto.descripcion}
                </Text>
            </Card>
        )
    }
}

export default Contacto;
