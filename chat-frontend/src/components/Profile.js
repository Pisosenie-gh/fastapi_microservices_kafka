import React, { useEffect, useState } from 'react';
import { get_profile } from '../api/Profile';
import { getUserId } from '../utils/auth';
import { Box, Spinner, Skeleton, Avatar, Heading, Text, Stack, Flex, Divider, Icon, Button, Center, Input } from '@chakra-ui/react';
import { MdLocationOn } from 'react-icons/md';

const ProfilePage = () => {
  const [profile, setProfile] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [isEditing, setIsEditing] = useState(false);
  const [editableProfile, setEditableProfile] = useState({});
  const userId = getUserId();

  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const response = await get_profile(userId);
        setProfile(response);
        setEditableProfile(response); // Initialize editableProfile with fetched profile data
      } catch (error) {
        console.error('Error fetching profile:', error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchProfile();
  }, [userId]);

  const handleEditClick = () => {
    setIsEditing(true);
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setEditableProfile((prevProfile) => ({
      ...prevProfile,
      [name]: value,
    }));
  };

  const handleSaveClick = () => {
    // Здесь вы можете реализовать логику сохранения изменений профиля
    setProfile(editableProfile);
    setIsEditing(false);
  };

  if (isLoading) {
    return (
      <Center minHeight="100vh">
        <Spinner
          thickness="4px"
          speed="0.65s"
          emptyColor="gray.200"
          color="blue.500"
          size="xl"
        />
      </Center>
    );
  }

  return (
    <Box maxW="3xl" mx="auto" p="6" borderWidth="1px" borderRadius="lg" overflow="hidden" bg="white" boxShadow="md">
      {profile ? (
        <>
          <Flex mb="4" alignItems="center">
            <Avatar size="2xl" name={profile.name} src={profile.profile_picture_url} />
            <Box ml="4">
              {isEditing ? (
                <>
                  <Input
                    name="name"
                    value={editableProfile.name}
                    onChange={handleInputChange}
                    placeholder="Имя"
                    mb="2"
                  />
                  <Input
                    name="lastname"
                    value={editableProfile.lastname}
                    onChange={handleInputChange}
                    placeholder="Фамилия"
                    mb="2"
                  />
                </>
              ) : (
                <>
                  <Heading as="h2" size="lg">{profile.name} {profile.lastname}</Heading>
                  <Text fontSize="md" color="gray.500">Birthday: {profile.birthday}</Text>
                  <Flex align="center" color="gray.500">
                    <Icon as={MdLocationOn} mr="1" />
                    <Text fontSize="md">Location</Text>
                  </Flex>
                </>
              )}
            </Box>
          </Flex>
          <Divider mb="4" />
          <Stack spacing={4}>
            <Text>ID: {profile.id}</Text>
            <Text>User ID: {profile.user_id}</Text>
            <Text>Created At: {profile.created_at}</Text>
            <Text>Updated At: {profile.updated_at}</Text>
          </Stack>
          {isEditing ? (
            <Button mt="4" colorScheme="green" onClick={handleSaveClick}>Сохранить</Button>
          ) : (
            <Button mt="4" colorScheme="blue" onClick={handleEditClick}>Изменить</Button>
          )}
        </>
      ) : (
        <Skeleton height="20px" my="10px" />
      )}
    </Box>
  );
};

export default ProfilePage;
