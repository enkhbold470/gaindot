//! Pallet to handle fitness tracking and reward distribution.
// GainDot Module
// This module provides functionality for tracking fitness data and rewarding users for their fitness activities.

use frame_support::{decl_module, decl_storage, decl_event, decl_error, dispatch};
use frame_system::ensure_signed;
use sp_std::vec::Vec;

#[cfg(test)]
mod mock;

#[cfg(test)]
mod tests;

pub trait Config: frame_system::Config {
    /// The overarching event type.
    type Event: From<Event<Self>> + Into<<Self as frame_system::Config>::Event>;
}

decl_storage! {
    trait Store for Module<T: Config> as GainDotModule {
        FitnessData get(fn fitness_data): map hasher(blake2_128_concat) T::AccountId => Vec<u8>;
        RewardData get(fn reward_data): map hasher(blake2_128_concat) T::AccountId => u64;
    }
}

decl_event!(
    pub enum Event<T> where AccountId = <T as frame_system::Config>::AccountId {
        FitnessLogged(AccountId, Vec<u8>),
        RewardClaimed(AccountId, u64),
    }
);

decl_error! {
    pub enum Error for Module<T: Config> {
        NoneValue,
        StorageOverflow,
    }
}

decl_module! {
    pub struct Module<T: Config> for enum Call where origin: T::Origin {
        fn deposit_event() = default;

        #[weight = 10_000]
        pub fn log_fitness(origin, data: Vec<u8>) -> dispatch::DispatchResult {
            let who = ensure_signed(origin)?;

            FitnessData::<T>::insert(&who, data.clone());
            Self::deposit_event(RawEvent::FitnessLogged(who, data));
            Ok(())
        }

        #[weight = 10_000]
        pub fn claim_reward(origin) -> dispatch::DispatchResult {
            let who = ensure_signed(origin)?;

            let reward = Self::reward_data(&who).unwrap_or(0);
            RewardData::<T>::insert(&who, reward + 1);
            Self::deposit_event(RawEvent::RewardClaimed(who, reward + 1));
            Ok(())
        }
    }
}

#[weight = 10_000]
pub fn mint_nft(origin) -> dispatch::DispatchResult {
    let who = ensure_signed(origin)?;

    let nft_id = Self::unique_mint_nft(&who)?;
    RewardData::<T>::insert(&who, nft_id);
    Self::deposit_event(RawEvent::RewardClaimed(who, nft_id));
    Ok(())
}

fn unique_mint_nft(who: &T::AccountId) -> Result<u64, Error<T>> {
    // Implement the logic to mint NFT using Unique Network's API
    // Return the NFT ID or an error
    Ok(0)
}
