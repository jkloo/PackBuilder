import { CardSearch } from "@/components/CardSearch/CardSearch";
import { CardTable } from "@/components/CardTable/CardTable";
import { useAppStore } from "@/Store/store";
import { AppShell, Button, Container, Group, Input, List, Stack, Text, Title, Tooltip } from "@mantine/core";
import { IconBox, IconCards, IconCircle, IconCircleCheckFilled } from "@tabler/icons-react";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router";

export function PackBuilder() { 
  const packCards = useAppStore((state) => state.packBuilderCards)
  const addCard = useAppStore((state) => state.add)
  
  return (
    <AppShell.Main>
    <Container>
    <Stack>
      <Title>Pack Builder</Title>
      <PackBuilderToolbar/>  
      <CardSearch set="SEA" onSelect={addCard}/>
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
    <Input
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
      <Input
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
  }
  
  const handleCancel = () => {
    clear(true)
    navigate(-1)
  }

  const requirementIcon = (satisfied: boolean) => {
    return (
      satisfied
        ? <IconCircleCheckFilled color="var(--mantine-color-green-text)" size={20}/>
        : <IconCircle size={20}/>
    )
  }

  return (
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
        <Button variant="default" color="red" onClick={handleCancel}>Cancel</Button>
      </Group>
    </Group>
  )
}

