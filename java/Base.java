import net.sourceforge.jFuzzyLogic.FIS;
import net.sourceforge.jFuzzyLogic.plot.*;
import net.sourceforge.jFuzzyLogic.rule.Variable;
import net.sourceforge.jFuzzyLogic.FunctionBlock;
import javax.swing.JOptionPane;

public class Base{
    public static void main (String[] args){

        //carrega o 'base.fcl'
        FIS fis = FIS.load("base.fcl", true);

        //verifica se carregou certo
        if( fis == null ) { 
            System.err.println("deu pau no arquivo");
            return;
        }

        //localiza o bloco de função do "base.fcl" para usar mais tarde
        FunctionBlock functionBlock = fis.getFunctionBlock(null);

        // Dá os valores para as variáveis
        fis.setVariable("renda", Double.parseDouble(JOptionPane.showInputDialog("Insira a renda por cabeça da familia: ")));
        fis.setVariable("distancia", Double.parseDouble(JOptionPane.showInputDialog("Insira a distância até a escola: ")));
        fis.setVariable("neuro", Integer.parseInt(JOptionPane.showInputDialog("o aluno possui alguma neuro divergencia? 1- sim 0- não: ")));

        //calcula a situação
        fis.evaluate();

        //mostra os gráficos
        JFuzzyChart.get().chart(functionBlock);

        //mostra o gráfico da situação
        Variable situacao = functionBlock.getVariable("situacao");
        JFuzzyChart.get().chart(situacao, situacao.getDefuzzifier(), true);

        //printa o "base.fcl"
        System.out.println(fis);
    }
}
