"use client"
import { useState } from "react"
import { ethers } from "ethers";
import { saveAs } from 'file-saver';

const hiddenString = "* * * * *"

export default function WalletGenerator() {
    // Esential states to create a crypto wallet
    const [wallet, setWallet] = useState(null);

    // Ui States
    const [errorMessage, setErrorMessage] = useState(null);
    const [isLoading, setIsLoading] = useState(false);
    const [hidePhrase, setHidePhrase] = useState(true);

    // Create wallet button Handler
    const CreateWalletBtnHandler = async () => {
        setIsLoading(true)

        try {
            const wallet = await ethers.Wallet.createRandom();
            setWallet(wallet);

            console.log(wallet);
            setIsLoading(false)
            return;
        } catch (error) {
            setIsLoading(false)
            console.error('Error generating wallet:', error);
            setErrorMessage('An error occurred while generating the wallet.');
        }
    }

    const ExportWalletHandler = () => {
        if (!wallet) return;

        const walletData = {
            address: wallet.address,
            privateKey: wallet.privateKey,
            mnemonic: wallet.mnemonic.phrase
        };

        const walletJSON = JSON.stringify(walletData);
        const blob = new Blob([walletJSON], { type: 'text/plain;charset=utf-8' });
        saveAs(blob, 'file.txt');

    }

    if (errorMessage) {
        return (
            <div className="m-auto p-8 flex flex-col justify-center items-center bg-[var(--color-surface)] rounded-lg sm:min-w-80">
                <div className="w-full mb-4 flex justify-between items-center">
                    <h3 className="font-semibold">Error Message</h3>
                    <button onClick={() => setErrorMessage('')}>
                        {'<-'}
                    </button>
                </div>
                <div className="flex flex-col justify-center items-center gap-2 text-sm">
                    <p className=" font-medium p-2 bg-rose-500 text-white rounded">{errorMessage}</p>
                </div>
            </div>
        )
    }

    if (!wallet) {
        return (
            <div className="m-auto p-8 flex flex-col justify-center items-center gap-5 bg-[var(--color-surface)] rounded-lg sm:min-w-80">
                <div className="flex justify-center items-center">
                    <button onClick={CreateWalletBtnHandler} className="bg-[var(--primary-color)] text-[var(--color-background)] font-medium py-2 px-4 rounded">
                        {isLoading ? 'Loading...' : 'Generate New Wallet'}</button>
                </div>
            </div>
        )
    }

    return (
        <div className="m-auto p-8 flex flex-col justify-center items-center bg-[var(--color-surface)] rounded-lg sm:min-w-80">
            <div className="w-full mb-8 flex justify-between items-center">
                <div className="flex-1">
                    <button onClick={() => setWallet('')} className="text-[var(--color-text-hl)]">
                        {'<-'}
                    </button>
                </div>
                <div className="flex-1">
                    <h2 className="text-center text-lg font-semibold">New Wallet</h2>
                </div>
                <div className="flex-1 flex justify-end">
                    <button onClick={ExportWalletHandler} title="Export your data as .txt file">
                        <Icon type="download" />
                    </button>
                </div>
            </div>
            <div className="flex flex-col justify-center items-left gap-5 text-sm">
                <div className=""><span className="font-semibold text-[var(--color-text-hl)]">Address:</span> {wallet.address}</div>
                <div className="">
                    <p className="font-semibold text-[var(--color-text-hl)]">Private Key:</p>
                    <p>{wallet.privateKey}</p>
                </div>
                <div className="w-full">
                    <div className="flex justify-between w-full mb-2">
                        <span className="font-semibold text-[var(--color-text-hl)]">Seed Phrase:</span>
                        <button onClick={() => setHidePhrase(!hidePhrase)} className="font-medium text-[var(--color-text-hl)] opacity-50 stroke-[1]">{hidePhrase ? <Icon type="eyeOff" /> : <Icon type="eyeOn" />}</button>
                    </div>
                    <div className="grid grid-cols-3 gap-4 m-auto w-full">
                        {wallet.mnemonic.phrase.split(' ').map((word, index) => (
                            <div key={index} className="border-b px-2 py-1 capitalize font-medium tracking-wider"><span className="text-xs select-none">{index + 1} - </span>{hidePhrase ? hiddenString : word}</div>
                        ))}
                    </div>
                </div>
            </div>
        </div>
    )
}

function Icon({ type, children, ...props }) {
    const icon = {
        eyeOff: (
            <svg viewBox="0 0 24 24" width={24} fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={props.className}>
                <path d="M3.99989 4L19.9999 20M16.4999 16.7559C15.1473 17.4845 13.6185 17.9999 11.9999 17.9999C8.46924 17.9999 5.36624 15.5478 3.5868 13.7788C3.1171 13.3119 2.88229 13.0784 2.7328 12.6201C2.62619 12.2933 2.62616 11.7066 2.7328 11.3797C2.88233 10.9215 3.11763 10.6875 3.58827 10.2197C4.48515 9.32821 5.71801 8.26359 7.17219 7.42676M19.4999 14.6335C19.8329 14.3405 20.138 14.0523 20.4117 13.7803L20.4146 13.7772C20.8832 13.3114 21.1182 13.0779 21.2674 12.6206C21.374 12.2938 21.3738 11.7068 21.2672 11.38C21.1178 10.9219 20.8827 10.6877 20.4133 10.2211C18.6338 8.45208 15.5305 6 11.9999 6C11.6624 6 11.3288 6.02241 10.9999 6.06448M13.3228 13.5C12.9702 13.8112 12.5071 14 11.9999 14C10.8953 14 9.99989 13.1046 9.99989 12C9.99989 11.4605 10.2135 10.9711 10.5608 10.6113" />
            </svg>
        ),
        eyeOn: (
            <svg viewBox="0 0 24 24" width={24} fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={props.className}>
                <path d="M3.5868 13.7788C5.36623 15.5478 8.46953 17.9999 12.0002 17.9999C15.5308 17.9999 18.6335 15.5478 20.413 13.7788C20.8823 13.3123 21.1177 13.0782 21.2671 12.6201C21.3738 12.2933 21.3738 11.7067 21.2671 11.3799C21.1177 10.9218 20.8823 10.6877 20.413 10.2211C18.6335 8.45208 15.5308 6 12.0002 6C8.46953 6 5.36623 8.45208 3.5868 10.2211C3.11714 10.688 2.88229 10.9216 2.7328 11.3799C2.62618 11.7067 2.62618 12.2933 2.7328 12.6201C2.88229 13.0784 3.11714 13.3119 3.5868 13.7788Z" />
                <path d="M10 12C10 13.1046 10.8954 14 12 14C13.1046 14 14 13.1046 14 12C14 10.8954 13.1046 10 12 10C10.8954 10 10 10.8954 10 12Z" />
            </svg>
        ),
        download: (
            <svg viewBox="0 0 24 24" width={24} fill="none" stroke="currentColor" strokeWidth="1" strokeLinecap="round" strokeLinejoin="round" className={props.className}>
                <path d="M18.437,20.948H5.563a2.372,2.372,0,0,1-2.5-2.21v-11a2.372,2.372,0,0,1,2.5-2.211h.462a.5.5,0,0,1,0,1H5.563a1.38,1.38,0,0,0-1.5,1.211v11a1.38,1.38,0,0,0,1.5,1.21H18.437a1.38,1.38,0,0,0,1.5-1.21v-11a1.38,1.38,0,0,0-1.5-1.211h-.462a.5.5,0,0,1,0-1h.462a2.372,2.372,0,0,1,2.5,2.211v11A2.372,2.372,0,0,1,18.437,20.948Z" />
                <path d="M15.355,10.592l-3,3a.5.5,0,0,1-.35.15.508.508,0,0,1-.36-.15l-3-3a.5.5,0,0,1,.71-.71l2.14,2.139V3.552a.508.508,0,0,1,.5-.5.5.5,0,0,1,.5.5v8.49l2.15-2.16a.5.5,0,0,1,.71.71Z" />
            </svg>
        ),
    }

    return (
        <>
            {icon[type]}
        </>
    )
}