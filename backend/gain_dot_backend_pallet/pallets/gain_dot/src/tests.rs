// here is our test file for GainDot pallet
#[cfg(test)]
mod tests {
    use super::*;
    use crate as gain_dot;
    use frame_support::{assert_ok, impl_outer_origin, parameter_types};
    use sp_core::H256;
    use sp_runtime::{
        traits::{BlakeTwo256, IdentityLookup}, testing::Header,
    };
    use frame_system as system;

    impl_outer_origin! {
        pub enum Origin for Test {}
    }

    #[derive(Clone, Eq, PartialEq)]
    pub struct Test;

    parameter_types! {
        pub const BlockHashCount: u64 = 250;
    }

    impl system::Config for Test {
        type BaseCallFilter = ();
        type BlockWeights = ();
        type BlockLength = ();
        type DbWeight = ();
        type Origin = Origin;
        type Index = u64;
        type BlockNumber = u64;
        type Call = ();
        type Hash = H256;
        type Hashing = BlakeTwo256;
        type AccountId = u64;
        type Lookup = IdentityLookup<Self::AccountId>;
        type Header = Header;
        type Event = ();
        type BlockHashCount = BlockHashCount;
        type Version = ();
        type PalletInfo = ();
        type AccountData = ();
        type OnNewAccount = ();
        type OnKilledAccount = ();
        type SystemWeightInfo = ();
        type SS58Prefix = ();
    }

    impl Config for Test {
        type Event = ();
    }

    type GainDot = Module<Test>;

    #[test]
    fn it_works_for_log_fitness() {
        new_test_ext().execute_with(|| {
            // Test the `log_fitness` function
            assert_ok!(GainDot::log_fitness(Origin::signed(1), vec![1, 2, 3]));
        });
    }

    #[test]
    fn it_works_for_claim_reward() {
        new_test_ext().execute_with(|| {
            // Test the `claim_reward` function
            assert_ok!(GainDot::claim_reward(Origin::signed(1)));
        });
    }
}
