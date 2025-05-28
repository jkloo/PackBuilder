import { CardSearch } from "@/components/CardSearch/CardSearch";
import { CardTable } from "@/components/CardTable/CardTable";
import { useAppStore } from "@/Store/store";
import { AppShell, Button, Container, Group, Input, List, Modal, Stack, Text, TextInput, Title, Tooltip } from "@mantine/core";
import { IconBox, IconCards, IconCheck, IconCircle, IconCircleCheckFilled, IconPlus } from "@tabler/icons-react";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router";
import { notifications } from '@mantine/notifications';
import { CardModel } from "@/Models/Card.model";

export function PackBuilder() { 
  const packCards = useAppStore((state) => state.packBuilderCards)
  const addCard = useAppStore((state) => state.add)

  const handleAdd = (card: CardModel) => {
    addCard(card)
    notifications.show({
      position: 'bottom-left',
      color: 'teal',
      title: 'Card added',
      message: `${card.name} (${card.id})`,
      icon: <IconPlus size={18} />,
      autoClose: 1500
    });
  }
  
  return (
    <AppShell.Main>
    <Container>
    <Stack>
      <Title>Pack Builder</Title>
      <PackBuilderToolbar/>  
      <CardSearch set="SEA" onSelect={handleAdd}/>
      <CardTable cards={packCards}/>
    </Stack>
    </Container>
    </AppShell.Main>
  )
}

function BoxInput({value, setValue}: { value?: string, setValue(value?: string):void }) {
  return (
    <Tooltip
      color="gray"
      label={
        <Stack gap={4}>
        <Text fw={600} size="sm">
          Group packs into a box
        </Text>
        <Text size="sm">
          If you do not supply a value, one will be generated on save.
        </Text>
        </Stack>
      }
      multiline
      w={240}
      position="bottom"
    >
    <TextInput
      placeholder="Box ID"
      value={value}
      onChange={(event) => setValue(event.currentTarget.value)}
      leftSection={<IconBox size={16}/>}
      leftSectionPointerEvents="none"
      rightSection={
        <Input.ClearButton onClick={() => setValue('')}/>
      }
      rightSectionPointerEvents="auto"
      size="sm"
      />
    </Tooltip>
  )
}

function PackInput({value, setValue}: { value?: string, setValue(value?: string):void }) {
  return (
    <Tooltip
      color="gray"
      label={
        <Stack gap={4}>
        <Text fw={600} size="sm">
          Unique Pack ID
        </Text>
        <Text size="sm">
          Pack ID will be generated on save.
        </Text>
        </Stack>
      }
      multiline
      w={240}
      position="bottom"
    >
      <TextInput
        placeholder="Pack ID"
        value={value}
        onChange={(event) => setValue(event.currentTarget.value)}
        leftSection={<IconCards size={16}/>}
        leftSectionPointerEvents="none"
        rightSection={
          <Input.ClearButton
            onClick={() => setValue('')}
            disabled
          />
        }
        rightSectionPointerEvents="auto"
        size="sm"
        disabled
        />
    </Tooltip>
  )
}

export function PackBuilderToolbar() {
  const [showCancelConfirm, setShowCancelConfirm] = useState(false)
  const [saveDisabled, setSaveDisabled] = useState(false)
  const [validations, setValidations] = useState([false, false, false])

  const clear = useAppStore((state) => state.clearBuilder)
  const packCards = useAppStore((state) => state.packBuilderCards)

  const boxId = useAppStore((state) => state.boxId)
  const setBoxId = useAppStore((state) => state.setBoxId)
  
  const packId = useAppStore((state) => state.packId)
  const setPackId = useAppStore((state) => state.setPackId)

  const savePack = useAppStore((state) => state.upsert)

  const navigate = useNavigate()
  
  useEffect(() => {
    const valid = [
      packCards.length == 14,
      packCards.filter((c) => c.foiling == 'R').length == 1,
      packCards.filter((c) => ['R', 'M'].includes(c.rarity) && c.foiling =='S').length == 2
    ]
    setValidations(valid)
  }, [packCards])

  useEffect(() => {
    setSaveDisabled(!validations.every(Boolean))
  }, [validations])
  
  const handleSave = () => {
    console.log('Presave Box ID -', boxId)
    savePack(packCards, { packId, boxId })
    clear(false)
    
    if (packId) { navigate(-1) }
    notifications.show({
      id: 'pack-save',
      position: 'bottom-center',
      color: 'teal',
      title: 'Pack saved',
      message: 'Your cards are safe and sound.',
      icon: <IconCheck size={18} />,
      autoClose: 2000,
    });
  }
  
  const handleCancel = () => {
    clear(true)
    navigate(-1)
    setShowCancelConfirm(false)
  }

  const confirmCancel = () => {
    if (packCards.length == 0) {
      handleCancel()
    } else {
      setShowCancelConfirm(true)
    }
  }

  const requirementIcon = (satisfied: boolean) => {
    return (
      satisfied
        ? <IconCircleCheckFilled color="var(--mantine-color-green-text)" size={20}/>
        : <IconCircle size={20}/>
    )
  }

  return (
    <>
    <Group justify="space-between">
      <Group>
        <BoxInput value={boxId} setValue={setBoxId}/>
        <PackInput value={packId} setValue={setPackId} />
      </Group>
      <Group>
        <Tooltip color="gray"
          label={
            <Stack gap={4}>
              <Text fw={600} size="xs" c="gray">Pack requirements</Text>
            <List size="sm">
              <List.Item icon={requirementIcon(validations[0])}>14 cards</List.Item>
              <List.Item icon={requirementIcon(validations[1])}>1 Rainbow foil</List.Item>  
              <List.Item icon={requirementIcon(validations[2])}>2 Rare+</List.Item>  
            </List>
            </Stack>
          }
          disabled={!saveDisabled}
          multiline
          w={220}
        >
          <Button disabled={saveDisabled} onClick={handleSave}>Save</Button>

        </Tooltip>
        <Button variant="default" color="red" onClick={confirmCancel}>Cancel</Button>
      </Group>
    </Group>
    <Modal opened={showCancelConfirm} onClose={() => setShowCancelConfirm(false)} title={packId ? 'Cancel changes' : 'Discard pack'} centered>
      <Text>Are you sure you want to cancel your changes to this pack? Your changes will be lost forever!</Text>
      <Group mt="xl" justify='flex-end'>
        <Button variant='default' onClick={()=> setShowCancelConfirm(false)}>Stay here</Button>
        <Button color='red' onClick={handleCancel}>I'm sure</Button>
      </Group>
    </Modal>
    </>
  )
}

