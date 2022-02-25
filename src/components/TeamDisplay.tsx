import React from "react";
import { useParams } from "react-router-dom";
import { useState, useEffect } from "react";
import { thumbnails } from "./data/thumbnails";
import {website, statModifier} from "./data/apiWebsite"
import { PlayerData } from "./playerComponents/PlayerData";
import { Link } from "react-router-dom";
import axios from "axios";


export const TeamDisplay = (): JSX.Element => {
    let params = useParams();
    
    const [data, setData] = useState <null | {id: number; locationName: string; teamName: string;}>(null);
    const [loading, setLoading] = React.useState(false);
    const [error, setError] = React.useState(null);
    const [x, setX] = React.useState(0);

    useEffect(() => {
        setLoading(true);
        try {
            (async() => {
                let teamAPI: any = await axios.get(website + '/api/v1/teams' + statModifier)        
                let i: number = 0;
                for(i = 0; i < teamAPI.data.teams.length; i++)
                {
                    console.log(teamAPI.data.teams[i].teamName + " " + params.teamName)
                    //find the api team
                    if(teamAPI.data.teams[i].teamName === params.teamName)
                    {
                        setX(i);
                        break;
                    }
                }
                setData(teamAPI.data.teams[i]);
                setLoading(false);
            })();
        }
        catch(e:any) {
            console.error(e);
            setError(e);
          }
    }, [params.teamName]);

    if(loading) return <h1>Loading...</h1>;

    if(error) return <pre>{JSON.stringify(error, null, 2)}</pre>
    
    if(data)
    {
        let api: string = `${website}/api/v1/teams/${data.id}/roster`;    
        return (
            <section className= " min-h-screen  bg-gray-400 bg-fixed bg-auto md:bg-cover text-white lg:px-36 xl:px-64 text-center p-20">
                <Link 
                    to="/NHLStatsApp/"
                    className="hover:bg-blue-500 absolute left-0 top-0 p-2 m-2 border bg-black"
                >
                    Return to home
                </Link>
                <div className="flex justify-center object-scale-down">
                    <h1 className=" text-gray-900 text-8xl font-extrabold text-left pb-0 p-5">{data.locationName}</h1>
                </div>
                <div className="flex justify-center object-scale-down">
                    <h1 className=" text-gray-900 text-8xl font-extrabold text-left pt-0 p-5">{data.teamName}</h1>
                </div>

                <div className="flex justify-center object-scale-down">
                    <img alt ="teamlogo" src={thumbnails[x]} width="100"></img>
                </div>

                <div className="flex justify-center object-scale-down"> 
                    <PlayerData
                        link = {api}
                    />
                </div>    

            </section>
        )
    }
    return <></>
} 