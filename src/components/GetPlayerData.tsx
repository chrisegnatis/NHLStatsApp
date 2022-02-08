import React, { useEffect } from "react";
import { useState } from "react";
import {GetIndividualPlayerData} from "./GetIndividualPlayerData"

interface PlayerProps {
  link : string;
}

export const GetPlayerData: React.FC<PlayerProps> = (props): JSX.Element =>  {

    const [data, setData] = useState <null | {roster: any}>(null);
    const [loading, setLoading] = React.useState(false);
    const [error, setError] = React.useState(null);
    useEffect(() => {
        setLoading(true);
        fetch(props.link)
            .then((response) => response.json())
            .then(setData)
            .then(() => setLoading(false))
            .catch(setError)
    }, []);

    if(loading) return <h1>Loading...</h1>;

    if(error) return <pre>{JSON.stringify(error, null, 2)}</pre>

    if(!data) return <> error</>;
    var rowList: JSX.Element[] = [];

    if(data) {
      for(let x = 0; x < data.roster.length; x++) {
        rowList.push(<GetIndividualPlayerData key = {x} id = {data.roster[x].person.id} name = {data.roster[x].person.name}/>);
      }
    }
      return (
        <table>
        {rowList}
      </table>
      )
    }



    