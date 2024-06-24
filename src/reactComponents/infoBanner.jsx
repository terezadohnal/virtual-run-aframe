import { useSettings } from '../store/SettingsContext';

export default function InfoBanner() {
  const {
    variables: { distance, elapsedDistance, energy, time: seconds },
    alert,
    formattedTime,
    formattedTempo,
  } = useSettings();

  return (
    <div className="absolute top-0 z-20  w-full">
      <div className="grid grid-cols-4 text-center bg-blue-100 w-10/12 mx-auto rounded-md p-3 mt-2 font-bold">
        <p>
          Uběhnuto:{' '}
          <span className="text-gray-500">
            {elapsedDistance.toFixed(2)}/{distance} km
          </span>
        </p>
        <p>
          Čas: <span className="text-gray-500">{formattedTime}</span>
        </p>
        <p>
          Tempo: <span className="text-gray-500">{formattedTempo}</span>
        </p>
        <div className="relative">
          <p>
            Energie: <span className="text-gray-500">{energy}%</span>
          </p>
          {alert && (
            <div className="absolute top-10 bg-red-300 rounded-md p-2 left-5">
              {alert === 'Boost'
                ? 'Boost energie! ✨'
                : 'Trefil jsi překážku 😮‍💨'}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
