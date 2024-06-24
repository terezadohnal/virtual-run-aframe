import 'aframe';
import banana from '../assets/banana.glb';
import runner from '../assets/man.glb';
import rocks from '../assets/rocks.glb';
import spike from '../assets/spike.glb';
import water from '../assets/water.glb';
import lemonade from '../assets/lemonade.glb';
import stadium from '../assets/stadium.jpg';
import grass from '../assets/grass.jpg';

export default function Assets() {
  return (
    <a-assets>
      <img id="stadium" src={stadium} />
      <img id="grass" src={grass} />
      <a-asset-item id="banana" src={banana}></a-asset-item>
      <a-asset-item id="runner" src={runner}></a-asset-item>
      <a-asset-item id="rocks" src={rocks}></a-asset-item>
      <a-asset-item id="spike" src={spike}></a-asset-item>
      <a-asset-item id="water" src={water}></a-asset-item>
      <a-asset-item id="lemonade" src={lemonade}></a-asset-item>
    </a-assets>
  );
}
