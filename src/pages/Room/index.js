import {useParams} from "react-router";
import useWebRTC, {LOCAL_VIDEO} from '../../hooks/useWebRTC';

export default function Room() {
    const {id: roomID} = useParams();
    const {clients, provideMediaRef} = useWebRTC(roomID);

    console.log('clients: ' + JSON.stringify(clients));
    console.log('provideMediaRef: ' + JSON.stringify(provideMediaRef));

    return (
        <div>
            {clients.map((clientID) => {
                return (
                    <video
                        key={clientID}
                        ref={instance => {
                            provideMediaRef(clientID, instance)
                        }}
                        autoPlay
                        playsInline
                        muted={clientID === LOCAL_VIDEO }
                    >

                    </video>
                )
            })};
        </div>
    )
}