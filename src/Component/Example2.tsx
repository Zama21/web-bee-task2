import { MediaQuery } from 'bbchut-react-media-query';

export const Example2 = () => (
    <div>
        <h1>Device Test!</h1>
        <MediaQuery minWidth={1224} minResolution={2} maxWidth={2024}>
            <p>You are a desktop or laptop</p>
            <MediaQuery minWidth={1824}>
                <p>You also have a huge screen</p>
            </MediaQuery>
        </MediaQuery>
        <MediaQuery minResolution={2}>
            {matches =>
                matches ? <p>You are retina</p> : <p>You are not retina</p>
            }
        </MediaQuery>
    </div>
);
