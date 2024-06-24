import {
  Modal,
  ModalContent,
  ModalHeader,
  ModalBody,
  Button,
  useDisclosure,
  ButtonGroup,
} from '@nextui-org/react';
import { useSettings } from '../store/SettingsContext';
import { useNavigate } from 'react-router-dom';

export default function Root() {
  const navigate = useNavigate();
  const { isOpen, onOpen, onOpenChange } = useDisclosure();
  const { setVariables, variables } = useSettings();

  const handleDistanceChange = (distance) => {
    setVariables((prevVariables) => ({
      ...prevVariables,
      distance,
    }));
  };

  const handleDifficultyChange = (difficulty) => {
    setVariables((prevVariables) => ({
      ...prevVariables,
      difficulty,
    }));
  };

  return (
    <div className="relative h-screen w-screen flex items-center justify-center overflow-hidden">
      <video
        autoPlay
        loop
        muted
        className="absolute inset-0 w-full h-full object-cover z-0 opacity-45"
      >
        <source src="running.mp4" type="video/mp4" />
        Your browser does not support the video tag.
      </video>

      <div className="absolute inset-0 bg-black opacity-50 z-10" />

      <div className="relative z-20 flex flex-col justify-center items-center gap-10 text-white">
        <h1 className="font-bold text-5xl text-blue-200">Virtual Run</h1>
        <h6 className="text-lg">
          Chceš si vyzkoušet, jaké to je zaběhnout si maraton?
        </h6>
        <h6 className="text-lg">Můžeš teď a tady!</h6>
        <Button color="primary" size="lg" onPress={onOpen}>
          Začni teď!
        </Button>
        <Modal isOpen={isOpen} onOpenChange={onOpenChange}>
          <ModalContent>
            {(onClose) => (
              <>
                <ModalHeader className="flex flex-col gap-1">
                  Vyber si obtížnost
                </ModalHeader>
                <ModalBody className="flex flex-col items-center gap-10">
                  <div className="flex flex-col items-center gap-5">
                    <p className="font-semibold">Kolik chceš uběhnout?</p>
                    <ButtonGroup color="primary" variant="bordered">
                      <Button
                        key={5}
                        className={
                          variables.distance === 5 ? 'bg-blue-100' : ''
                        }
                        onPress={() => handleDistanceChange(5)}
                      >
                        5
                      </Button>
                      <Button
                        key={10}
                        className={
                          variables.distance === 10 ? 'bg-blue-100' : ''
                        }
                        onPress={() => handleDistanceChange(10)}
                      >
                        10
                      </Button>
                      <Button
                        key={21}
                        className={
                          variables.distance === 21 ? 'bg-blue-100' : ''
                        }
                        onPress={() => handleDistanceChange(21)}
                      >
                        21
                      </Button>
                      <Button
                        key={50}
                        className={
                          variables.distance === 50 ? 'bg-blue-100' : ''
                        }
                        onPress={() => handleDistanceChange(50)}
                      >
                        ultra
                      </Button>
                    </ButtonGroup>

                    <p className="font-semibold">Jakou chceš náročnost?</p>
                    <ButtonGroup color="primary" variant="bordered">
                      <Button
                        key="easy"
                        className={
                          variables.difficulty === 'easy' ? 'bg-blue-100' : ''
                        }
                        onPress={() => handleDifficultyChange('easy')}
                      >
                        Easy run
                      </Button>
                      <Button
                        key="tempo"
                        className={
                          variables.difficulty === 'tempo' ? 'bg-blue-100' : ''
                        }
                        onPress={() => handleDifficultyChange('tempo')}
                      >
                        Tempo run
                      </Button>
                      <Button
                        key="race"
                        className={
                          variables.difficulty === 'race' ? 'bg-blue-100' : ''
                        }
                        onPress={() => handleDifficultyChange('race')}
                      >
                        Závod
                      </Button>
                    </ButtonGroup>
                  </div>
                  <div>
                    <Button
                      color="primary"
                      variant="flat"
                      onClick={() => navigate('/game')}
                    >
                      Start
                    </Button>
                  </div>
                </ModalBody>
              </>
            )}
          </ModalContent>
        </Modal>
      </div>
    </div>
  );
}
