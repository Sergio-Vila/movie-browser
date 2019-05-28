
import { TMDbCast } from "./TMDbInterfaces"

export class Actor {
    id: number;
    name: string;
    picture?: URL;
};

export function actorFromTMDbCast(tmdbCast: TMDbCast, imagesEndpoint: string): Actor {
    const actor: Actor = {
        id: tmdbCast.id,
        name: tmdbCast.name
    };

    if (tmdbCast.profile_path) {
        actor.picture = new URL(tmdbCast.profile_path, imagesEndpoint);
    }

    return actor;
}
