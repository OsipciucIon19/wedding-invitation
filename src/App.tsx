import {useEffect} from 'react';
import firstDateImage from './assets/first-date.jpg';
import newBeginningImage from './assets/new-beginning.jpg';
import proposalImage from './assets/proposal.jpg';
import Countdown from './components/Countdown';
import EventDetails from './components/EventDetails';
import Footer from './components/Footer';
import Gallery from './components/Gallery';
import Hero from './components/Hero';
import RSVP from './components/RSVP';
import ScrollProgress from './components/ScrollProgress';
import Story from './components/Story';
import galleryFirstImage from './assets/first-date.jpg';
import gallerySecondImage from './assets/hero1.jpg';
import galleryThirdImage from './assets/hero.jpg';
import galleryFourthImage from './assets/new-beginning.jpg';
import galleryFifthImage from './assets/proposal.jpg';
import gallerySixthImage from './assets/proposal1.jpg';
import gallerySeventhImage from './assets/first-date.jpg';
import galleryEightImage from './assets/first-date.jpg';

function App() {
    useEffect(() => {
        document.documentElement.style.scrollBehavior = 'smooth';
        return () => {
            document.documentElement.style.scrollBehavior = 'auto';
        };
    }, []);

    const stories = [
        {
            title: 'Prima Întâlnire',
            date: 'Iunie 2023',
            description:
                'Ne-am cunoscut într-o zi caldă de vară, într-un moment care părea obișnuit, dar care avea să ne schimbe viața. Din primele conversații am simțit că există ceva special între noi, iar fiecare zi care a urmat ne-a apropiat tot mai mult.',
            image: firstDateImage ?? 'https://images.pexels.com/photos/1024993/pexels-photo-1024993.jpeg?auto=compress&cs=tinysrgb&w=800',
        },
        {
            title: 'Cererea',
            date: 'Iulie 2025',
            description:
                'Într-o seară liniștită de vară, sub cerul plin de stele, am făcut pasul care ne-a unit pentru totdeauna. Cu emoție și iubire, am rostit întrebarea, iar răspunsul a fost un "Da" care ne-a confirmat că suntem pregătiți pentru o viață împreună.',
            image: proposalImage ?? 'https://images.pexels.com/photos/1702373/pexels-photo-1702373.jpeg?auto=compress&cs=tinysrgb&w=800',
        },
        {
            title: 'Noul Început',
            date: 'August 2026',
            description:
                'Acum ne pregătim să începem cel mai frumos capitol din viața noastră. Împreună vom construi o familie bazată pe dragoste, respect și înțelegere.',
            image: newBeginningImage ?? 'https://images.pexels.com/photos/1444442/pexels-photo-1444442.jpeg?auto=compress&cs=tinysrgb&w=800',
        },
    ];

    // const ceremony = {
    //     type: 'ceremony' as const,
    //     title: 'Ceremonia',
    //     location: 'Biserica Sfântul Nicolae',
    //     address: 'Str. Exemplu Nr. 123, București',
    //     time: '15:00',
    //     mapUrl: 'https://maps.google.com',
    // };

    const party = {
        type: 'party' as const,
        title: 'Petrecerea',
        location: 'Complexul Turistic "COSTEȘTI"',
        address: 's. Costești, r. Ialoveni',
        time: '16:00',
        mapUrl: 'https://www.google.com/maps/place//data=!4m2!3m1!1s0x40c983dd03faec09:0x61edd29ee6261aa2?sa=X&ved=1t:8290&ictx=111',
    };

    const galleryImages = [
        galleryFirstImage ?? 'https://images.pexels.com/photos/1024993/pexels-photo-1024993.jpeg?auto=compress&cs=tinysrgb&w=600',
        gallerySecondImage ?? 'https://images.pexels.com/photos/1702373/pexels-photo-1702373.jpeg?auto=compress&cs=tinysrgb&w=600',
        galleryThirdImage ?? 'https://images.pexels.com/photos/1444442/pexels-photo-1444442.jpeg?auto=compress&cs=tinysrgb&w=600',
        galleryFourthImage ?? 'https://images.pexels.com/photos/2253870/pexels-photo-2253870.jpeg?auto=compress&cs=tinysrgb&w=600',
        galleryFifthImage ?? 'https://images.pexels.com/photos/1159670/pexels-photo-1159670.jpeg?auto=compress&cs=tinysrgb&w=600',
        gallerySixthImage ?? 'https://images.pexels.com/photos/265722/pexels-photo-265722.jpeg?auto=compress&cs=tinysrgb&w=600',
        gallerySeventhImage ?? 'https://images.pexels.com/photos/1024975/pexels-photo-1024975.jpeg?auto=compress&cs=tinysrgb&w=600',
        galleryEightImage ?? 'https://images.pexels.com/photos/1444424/pexels-photo-1444424.jpeg?auto=compress&cs=tinysrgb&w=600',
    ];

    const weddingDate = new Date('2026-08-28T13:00:00Z');

    return (
        <div className="min-h-screen bg-white">
            <ScrollProgress/>

            <Hero
                brideName="Valeria"
                groomName="Vlad"
                weddingDate="28 August 2026"
            />

            <Story stories={stories}/>

            <EventDetails party={party}/>

            <Gallery images={galleryImages}/>

            <Countdown weddingDate={weddingDate}/>

            <RSVP/>

            <Footer/>
        </div>
    );
}

export default App;
