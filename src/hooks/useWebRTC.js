import {useCallback, useEffect, useRef, useState} from "react";
import socket from "../socket";
import ACTIONS from "../socket/actions";
import useStateWithCallback from "./useStateWithCallback";

export const LOCAL_VIDEO = 'LOCAL_VIDEO';

export default function useWebRTC(roomID) {
    const [clients, updateClients] = useStateWithCallback([]);

    const addNewClient = useCallback((newClient, cb) => {
       if (!clients.includes(newClient)) {
           updateClients(list => [...list, newClient], cb);
       }
    }, [clients, updateClients]);

    // Соеденения клиента с другими клиентами
    const peerConnections = useRef({});
    // Ссылка на видео-аудио-элемент
    const localMediaStream = useRef(null);
    // Ссылка на все видео-элементы
    const peerMediaElements = useRef({
        [LOCAL_VIDEO]: null,
    });

    useEffect(() => {
        async function startCapture() {
            localMediaStream.current = await navigator.mediaDevices.getUserMedia({
               audio: true,
               video: {
                   width: 1280,
                   height: 720,
               }
            });
            console.log('LocalMediaStream Created');

            addNewClient(LOCAL_VIDEO, () => {
               const localVideoElement = peerMediaElements.current[LOCAL_VIDEO];

               if (localVideoElement) {
                   localVideoElement.volume = 0;
                   localVideoElement.srcObject = localMediaStream.current;
               }
            });
            console.log('New Client Added');
        }

        startCapture()
            .then(() => socket.emit(ACTIONS.JOIN, {room: roomID}))
            .catch((e) => console.error('Error getting userMedia: ', e))
    }, [roomID]);

    const provideMediaRef = useCallback((id, node) => {
        peerMediaElements.current[id] = node;
    }, []);

    return {
        clients,
        provideMediaRef,
    };

}